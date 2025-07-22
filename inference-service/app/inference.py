import os
import io
import numpy as np
from PIL import Image
from ultralytics import YOLO

# Load classification model once at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best.pt")
print(f"🔍 Loading YOLO model from {MODEL_PATH}")
model = YOLO(MODEL_PATH)
print("✅ YOLO classification model loaded")

def run_classification(image_bytes: bytes):
    """
    Run the YOLO model in classification mode.
    Returns:
      best_class_id (int), best_confidence (float)
    """
    # Convert bytes to PIL Image and numpy array
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    np_img = np.array(img)

    # Perform inference
    inference = model(np_img)
    # If YOLO returns a list, take the first result
    res = inference[0] if isinstance(inference, (list, tuple)) else inference

    # Ensure classification probabilities exist
    if not hasattr(res, 'probs'):
        raise RuntimeError("Model did not return classification probabilities")

    # Access the probs object directly
    probs_obj = res.probs

    if probs_obj is None:
        raise RuntimeError("Probs object is None")

    # Find the class with highest probability
    best_idx = probs_obj.top1
    best_conf = probs_obj.top1conf.item()

    return best_idx, best_conf
