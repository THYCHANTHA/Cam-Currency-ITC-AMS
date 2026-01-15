from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class DetectionItem(BaseModel):
    class_name: str
    confidence: float
    value: int

class DetectionBase(BaseModel):
    filename: str

class DetectionCreate(DetectionBase):
    total_amount: float
    detections_data: List[Dict[str, Any]]

class DetectionResult(DetectionBase):
    id: int
    total_amount: float
    detections: List[Dict[str, Any]] = [] # Mapping to detections_data
    created_at: datetime

    class Config:
        orm_mode = True
