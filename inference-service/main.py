import os
import sys
from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
import uvicorn
import numpy as np
from PIL import Image
import io

# ─── Debug prints ───
print("📂 Working directory:", os.getcwd())
print("📑 Files:", os.listdir(os.getcwd()))
print("🐍 Python executable:", sys.executable)
print("🔍 Starting main.py…")
# ────────────────────

app = FastAPI(title="YOLOv8 Inference API")

@app.get("/ping")
async def ping():
    return {"status": "alive"}

# ─── Load model ───
print("🔍 Attempting to load YOLO model from best.pt")
model = YOLO("best.pt")
print("✅ YOLO model loaded successfully")
# ──────────────────

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    # Read & prepare image
    contents = await image.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    np_img = np.array(img)

    # 1) Run inference via the model() call
    inference = model(np_img)
    # If it returns a list, grab the first Results; if single Results, use it directly
    results = inference[0] if isinstance(inference, (list, tuple)) else inference

    # 2) If for some reason results is None, short-circuit to empty
    if results is None or results.boxes is None:
        return {"boxes": [], "confidences": [], "classes": []}

    # 3) Extract box data safely
    # results.boxes.xyxy is a tensor of shape (N,4)
    xyxy = results.boxes.xyxy
    confs = results.boxes.conf
    clss = results.boxes.cls

    # 4) Convert to Python lists
    boxes      = xyxy.tolist() if xyxy is not None else []
    confidences = confs.tolist() if confs is not None else []
    classes     = clss.tolist() if clss is not None else []

    return {
        "boxes":      boxes,
        "confidences": confidences,
        "classes":     classes
    }

if __name__ == "__main__":
    # Use the PORT env var set by Cloud Run (default 8080)
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
