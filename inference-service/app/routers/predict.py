from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from ..db import SessionLocal, engine
from ..models import Base, Image, Classification
from ..storage import upload_image, generate_signed_url
from ..inference import run_classification

# ensure tables exist
Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.post("/predict")
async def predict(
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 1) Upload
    blob_name = f"uploads/{image.filename}"
    upload_image(image.file, blob_name, image.content_type)

    # 2) Generate a URL valid for, say, 15 minutes
    signed_url = generate_signed_url(blob_name, expires_minutes=15)

    # 2) inference
    img_bytes = await image.read()
    class_id, confidence = run_classification(img_bytes)

    # 3) persist image record
    img = Image(image_url=signed_url, origin='predict')
    db.add(img); db.commit(); db.refresh(img)

    # 4) persist detections
    cls = Classification(
    image_id   = img.image_id,
    class_id   = class_id,
    confidence = confidence
    )
    db.add(cls); db.commit()
    db.close()


# respond with just class + confidence
    return {
        "image_url": signed_url,
        "class_id":  class_id,
        "confidence": confidence
    }