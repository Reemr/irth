import os
import uvicorn
from fastapi import FastAPI
from .config import settings
from .routers import health, predict

app = FastAPI(title="YOLOv8 Inference API")
app.include_router(health.router)
app.include_router(predict.router)

if __name__ == '__main__':
    uvicorn.run(
        'app.main:app', host='0.0.0.0', port=int(os.getenv('PORT', 8080)), reload=True
    )