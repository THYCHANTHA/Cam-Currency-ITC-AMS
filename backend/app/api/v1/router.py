from fastapi import APIRouter

from app.api.v1.endpoints import detect, history, database

api_router = APIRouter()

# Register modular endpoints
# This keeps main.py clean and allows easy scaling
api_router.include_router(detect.router, prefix="/detect", tags=["Detection"])
api_router.include_router(history.router, prefix="/history", tags=["History"])
api_router.include_router(database.router, prefix="/database", tags=["System Check"])
