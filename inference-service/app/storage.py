from google.cloud import storage
from datetime import timedelta
from .config import settings

_client = storage.Client()
_bucket = _client.bucket(settings.BUCKET_NAME)

def upload_image(file_obj, dest_path, content_type: str):
    blob = _bucket.blob(dest_path)
    blob.upload_from_file(file_obj, content_type=content_type)
    return blob.name  # return the path, not a public URL

def generate_signed_url(blob_name: str, expires_minutes: int = 15) -> str:
    blob = _bucket.blob(blob_name)
    url = blob.generate_signed_url(
        version="v4",
        expiration=timedelta(minutes=expires_minutes),
        method="GET",
    )
    return url