from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.logging import log
from app.api.v1.router import api_router
from app.db.session import engine
from app.models_db import Base

# 1. Lifespan Events (Startup/Shutdown)
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("🚀 Starting CamCurrency API...")
    log.info(f"Environment: {settings.ENV_STATE}")
    
    # Initialize Database Tables
    try:
        log.info("🗄️  Initializing Database Tables...")
        Base.metadata.create_all(bind=engine)
        log.success("🗄️  Database Tables Created/Verified.")
    except Exception as e:
        log.critical(f"❌ Database Access Failed: {e}")
    
    # Validation check for Model
    import os
    # Validation check for Model
    import os
    if not os.path.exists(settings.MODEL_PATH):
        # Log error in Red (handled by logger level)
        log.error(f"Model not found at {settings.MODEL_PATH}. Inference will fail until model is uploaded.")
    else:
        # Log success in Green (handled by logger level)
        log.success(f"Model found: {settings.MODEL_PATH}")
        
    yield
    
    log.info("🛑 Shutting down CamCurrency API...")

# 2. Main App Definition
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Mount Static Files (Results)
from fastapi.staticfiles import StaticFiles
import os
os.makedirs("results", exist_ok=True)
app.mount("/results", StaticFiles(directory="results"), name="results")

# 3. Middleware (CORS)
# Allows the Frontend (React/Vite) to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Router Registration
# Root endpoint to prevent 404 confusion
@app.get("/", tags=["Status"])
async def root():
    return {"message": "Welcome to CamCurrency API", "documentation": "/docs", "health_check": "/health"}

# We check health at root, but all API logic is in /api/v1
@app.get("/health", tags=["Status"])
async def health_check():
    return {"status": "ok", "version": settings.VERSION, "env": settings.ENV_STATE}

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    # Use standard host/port for container
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
