from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import get_db, engine
from app.models_db import Detection
from pydantic import BaseModel

router = APIRouter()

class DbStatus(BaseModel):
    status: str
    message: str
    rows_in_detections: int
    database_url_masked: str

@router.get("/", response_model=DbStatus)
async def check_database_status(db: Session = Depends(get_db)):
    """
    Check if the API can connect to the Database and read the table.
    """
    try:
        # 1. Connection Check
        db.execute(text("SELECT 1"))
        
        # 2. Table Count Check
        count = db.query(Detection).count()
        
        # 3. Get Safe URL
        url = str(engine.url)
        safe_url = url.split("@")[-1] if "@" in url else "Protected"

        return {
            "status": "online",
            "message": "Connection Successful",
            "rows_in_detections": count,
            "database_url_masked": safe_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Disconnected: {str(e)}")

@router.post("/test-insert")
async def insert_test_record(db: Session = Depends(get_db)):
    """
    Insert a test record to verify Write operations.
    """
    try:
        new_record = Detection(
            filename="manual_db_check.jpg",
            total_amount=123.0,
            detections_data=[{"note": "Test Record", "admin": True}],
        )
        db.add(new_record)
        db.commit()
        db.refresh(new_record)
        return {"status": "success", "new_id": new_record.id, "message": "Write operation verification successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Write Failed: {str(e)}")