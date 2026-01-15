import sys
from loguru import logger
from app.core.config import settings

def setup_logging():
    """
    Configures the Loguru logger to behave like a professional production logger.
    - JSON formatting for production (easy parsing)
    - Colorized output for development (readability)
    - file rotation for persistence
    """
    logger.remove() # Remove default handler
    
    if settings.ENV_STATE == "prod":
        # Production: JSON Logs, Info Level, Saved to File
        logger.add(
            sys.stderr,
            level="INFO",
            serialize=True, # JSON Format
            backtrace=True,
            diagnose=False # Don't leak variables in prod
        )
        logger.add(
            "logs/camcurrency_prod.log",
            rotation="500 MB",
            retention="10 days",
            level="INFO",
            serialize=True
        )
    else:
        # Development: Colorful, Debug Level, Verbose
        logger.add(
            sys.stderr,
            level="DEBUG",
            # <level> tag automatically colors based on severity (Red for Error, Green for Success if configured)
            format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
            backtrace=True,
            diagnose=True, 
            colorize=True
        )
        logger.add(
            "logs/camcurrency_dev.log",
            rotation="10 MB",
            level="DEBUG"
        )

    return logger

# Create a singleton logger instance
log = setup_logging()
