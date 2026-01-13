# -----------------------------------------------------------------------------------------
# STAGE 1: BUILDER (Optimized for size)
# -----------------------------------------------------------------------------------------
FROM python:3.10-slim as builder

WORKDIR /app

# Install system dependencies required for OpenCV and building (gcc)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# -----------------------------------------------------------------------------------------
# STAGE 2: RUNTIME (Final Image)
# -----------------------------------------------------------------------------------------
FROM python:3.10-slim

WORKDIR /app

# Install ONLY runtime libs for OpenCV (lighter than build-essential)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder to avoid recompiling
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy Application Code
COPY . .

# Create directory for models if not exists
RUN mkdir -p models

# Environment Variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose Port
EXPOSE 8000

# Start Command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
