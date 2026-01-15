import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.logging import log
from app.models.yolo import yolo_engine
from app.db.session import get_db
import shutil
import uuid
import os
import base64

from app.models_db import Detection
import json

router = APIRouter()

@router.post("/")
async def detect_currency(
    file: UploadFile = File(...), 
    save: bool = True, 
    db: Session = Depends(get_db)
):
    """
    Real-time Currency Detection.
    - save=True (Default): Saves image to disk, generates annotated image, logs to DB.
    - save=False (Video Mode): In-memory processing only. Faster, no DB record.
    """
    # 1. Validation & Security
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPG, PNG, WEBP allowed.")

    header = await file.read(1024)
    await file.seek(0)
    is_jpeg = header.startswith(b'\xff\xd8\xff')
    is_png = header.startswith(b'\x89PNG\r\n\x1a\n')
    if not (is_jpeg or is_png):
        log.warning(f"🚨 Security Alert: File {file.filename} has invalid header.")
        # raise HTTPException(status_code=400, detail="Security Violation: Invalid File Header.")

    # ---------------------------------------------------------
    # MODE A: SAVE ONLY (default)
    # ---------------------------------------------------------
    if save:
        filename = f"{uuid.uuid4()}_{file.filename}"
        upload_dir = "uploads"
        results_dir = "results"
        os.makedirs(upload_dir, exist_ok=True)
        os.makedirs(results_dir, exist_ok=True)

        input_path = os.path.join(upload_dir, filename)
        output_path = os.path.join(results_dir, f"verified_{filename}")
        
        try:
            with open(input_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                
            result = yolo_engine.predict(input_path, save_path=output_path)
            
            with open(output_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                result["annotated_image"] = encoded_string
                
            result["filename"] = file.filename
            result["verified_image_path"] = output_path
            
            # DB Save
            try:
                db_record = Detection(
                    filename=filename,
                    total_amount=result["total_value"],
                    detections_data=result["detections"],
                )
                db.add(db_record)
                db.commit()
                db.refresh(db_record)
                log.info(f"💾 Database Record Saved: ID {db_record.id}")
            except Exception as db_err:
                log.error(f"❌ Database Save Failed: {db_err}")
            
            return result

        except Exception as e:
             log.error(f"Prediction failed: {str(e)}")
             raise HTTPException(status_code=500, detail=str(e))

    # ---------------------------------------------------------
    # MODE B: STREAM / VIDEO (No Save)
    # ---------------------------------------------------------
    else:
        try:
            # Read file into memory (numpy array)
            contents = await file.read()
            nparr = np.frombuffer(contents, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Predict (No save path)
            result = yolo_engine.predict(frame, save_path=None)
            
            # Return pure JSON (No annotated image, no DB ID)
            return result
            
        except Exception as e:
            log.error(f"Stream Prediction failed: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
