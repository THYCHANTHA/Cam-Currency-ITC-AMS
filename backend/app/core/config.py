from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    # App Info
    PROJECT_NAME: str = "CamCurrency API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENV_STATE: str = "dev" # dev, prod, test
    DEBUG: bool = True

    # Security (CORS)
    # In production, this should be specific domains
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "*"]

    # Database
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "chantha123"
    POSTGRES_SERVER: str = "db"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "camcurrency-itc"
    
    @property
    def DATABASE_URL(self) -> str:
        if os.getenv("DATABASE_URL"):
            return os.getenv("DATABASE_URL")
        return f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # ML Model
    MODEL_PATH: str = "app/models/best.pt"
    CONFIDENCE_THRESHOLD: float = 0.60

    model_config = SettingsConfigDict(
        env_file=["../.env", ".env"], 
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
