import sys
import os

# Ensure we can import 'app' by adding the current directory to sys.path
sys.path.append(os.getcwd())

from sqlalchemy import text
from app.db.session import SessionLocal
from app.models_db import Detection
import datetime

def check_connection():
    print("🔄 Connecting to Database...")
    try:
        db = SessionLocal()
        # 1. Basic Connection Check
        result = db.execute(text("SELECT 1"))
        print(f"✅ Connection Successful! Test Query Result: {result.scalar()}")
        
        # 2. Check for Table Existence
        result = db.execute(text("SELECT count(*) FROM detections"))
        count = result.scalar()
        print(f"✅ Table 'detections' exists. Current Row Count: {count}")
        
        # 3. Update Database (Insert Dummy Data) - UNCOMMENT TO USE
        # print("\n📝 Attempting to Insert Test Record...")
        # new_record = Detection(
        #     filename="test_db_check.jpg",
        #     total_amount=5000.0,
        #     detections_data=[{"class": "5000", "confidence": 0.99}],
        #     created_at=datetime.datetime.now()
        # )
        # db.add(new_record)
        # db.commit()
        # print(f"✅ Test Record Inserted! ID: {new_record.id}")

        db.close()
        
    except Exception as e:
        print(f"❌ Database Connection Failed:\n{e}")

if __name__ == "__main__":
    # Check if .env is loaded correctly by printing (masked) DB URL
    from app.core.config import settings
    print(f"Checking Config Safe URL: {settings.DATABASE_URL.split('@')[-1]}") 
    
    check_connection()
