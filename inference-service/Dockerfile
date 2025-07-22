FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10


USER root

# 1) Install system‐level libs for GLib, OpenGL, etc.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libgl1-mesa-glx \
    libsm6 \
    libxrender1 \
    libxext6 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2) Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3) Copy in your entire application
COPY app/ ./app/

# 4) Tiangolo which module to load
ENV APP_MODULE=app.main:app
