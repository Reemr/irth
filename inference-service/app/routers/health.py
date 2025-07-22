from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/ping")
def ping():
    return {"status": "alive", "time": datetime.utcnow().isoformat()}