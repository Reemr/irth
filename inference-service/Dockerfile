FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10


USER root

# Install GLib, OpenGL, and X-libs
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libgl1-mesa-glx \
    libsm6 \
    libxrender1 \
    libxext6 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. Copy & install your Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Copy your code + weights
COPY main.py . 
COPY best.pt .

# (tiangolo’s image will read APP_MODULE or default to main:app)
ENV APP_MODULE=main:app
