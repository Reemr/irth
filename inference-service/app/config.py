from pydantic import BaseSettings

class Settings(BaseSettings):

    CLOUD_SQL_CONNECTION_NAME: str
    
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    BUCKET_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()