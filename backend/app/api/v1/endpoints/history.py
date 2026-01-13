from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import os
from pathlib import Path

from app.db.session import get_db
from app.models_db import Detection
from app.schemas import DetectionResult

router = APIRouter()

@router.get("/", response_model=List[DetectionResult])
async def read_history(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """
    Retrieve scan history from the database.
    """
    history = db.query(Detection).order_by(Detection.created_at.desc()).offset(skip).limit(limit).all()
    
    # Map raw SQL results to Schema if needed (though Pydantic 'orm_mode' handles simple cases)
    # The JSON column 'detections_data' maps to 'detections' in Schema via root_validator or alias if strict,
    # but let's manually map for safety or rely on Pydantic.
    # Our Schema has 'detections', DB has 'detections_data'.
    
    results = []
    for h in history:
        results.append({
            "id": h.id,
            "filename": h.filename,
            "total_amount": h.total_amount,
            "detections": h.detections_data, # Mapping DB JSON to Schema List
            "created_at": h.created_at
        })

    return results

@router.delete("/")
async def clear_history(range: str = "all", db: Session = Depends(get_db)):
    from datetime import datetime, timedelta
    
    now = datetime.now()
    
    query = db.query(Detection)
    
    if range == "1h":
        cutoff = now - timedelta(hours=1)
        query = query.filter(Detection.created_at >= cutoff)
    elif range == "5h":
        cutoff = now - timedelta(hours=5)
        query = query.filter(Detection.created_at >= cutoff)
    elif range == "today":
        cutoff = now.replace(hour=0, minute=0, second=0, microsecond=0)
        query = query.filter(Detection.created_at >= cutoff)
    elif range == "all":
        pass # No filter needed, delete all
    else:
        raise HTTPException(status_code=400, detail="Invalid range. Use: 1h, 5h, today, all")
    
    records_to_delete = query.all()
    
    count = 0
    for record in records_to_delete:
        # 1. Delete Physical Files
        if record.filename:
            try:
                # Try to delete from Uploads
                upload_path = Path("uploads") / record.filename
                if upload_path.exists():
                    os.remove(upload_path)
                
                # Try to delete from Results
                result_path = Path("results") / f"verified_{record.filename}"
                if result_path.exists():
                    os.remove(result_path)
            except Exception as e:
                print(f"Error removing file {record.filename}: {e}")

        # 2. Delete from DB
        db.delete(record)
        count += 1
    
    db.commit()
    
    return {"message": f"Deleted {count} records and associated files (Range: {range})"}

@router.delete("/{id}")
async def delete_record(id: int, db: Session = Depends(get_db)):
    """
    Delete a specific detection record by its ID.
    """
    record = db.query(Detection).filter(Detection.id == id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # 1. Delete Physical Files
    if record.filename:
        try:
            # Try to delete from Uploads
            upload_path = Path("uploads") / record.filename
            if upload_path.exists():
                os.remove(upload_path)
            
            # Try to delete from Results
            result_path = Path("results") / f"verified_{record.filename}"
            if result_path.exists():
                os.remove(result_path)
        except Exception as e:
            print(f"Error removing file {record.filename}: {e}")

    # 2. Delete from DB
    db.delete(record)
    db.commit()
    
    return {"message": f"Record {id} and associated files deleted successfully"}
