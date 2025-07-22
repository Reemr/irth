from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import settings

# Use Cloud SQL socket path
DATABASE_URL = (
    f"postgresql+pg8000://{settings.DB_USER}:{settings.DB_PASS}@/{settings.DB_NAME}"
    f"?unix_sock=/cloudsql/{settings.CLOUD_SQL_CONNECTION_NAME}/.s.PGSQL.5432"
)
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine, autoflush=False)