from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text, Float, TIMESTAMP, ForeignKey
from sqlalchemy.dialects.postgresql import FLOAT8, ARRAY, TEXT
from sqlalchemy import text
from sqlalchemy.orm import relationship

Base = declarative_base()

class Image(Base):
    __tablename__ = 'images'
    image_id = Column(Integer, primary_key=True)
    image_url = Column(Text, nullable=False)
    origin = Column(Text, nullable=False)
    timestamp = Column(TIMESTAMP, nullable=False, server_default=text('NOW()'))

class Detection(Base):
    __tablename__ = 'detections'
    detection_id = Column(Integer, primary_key=True)
    image_id = Column(Integer, ForeignKey('images.image_id', ondelete='CASCADE'), nullable=False)
    class_id = Column(Integer, nullable=False)
    confidence = Column(Float, nullable=False)
    bbox = Column(ARRAY(FLOAT8), nullable=False)  # [x1,y1,x2,y2]
    created_at = Column(TIMESTAMP, nullable=False, server_default=text('NOW()'))

class Classification(Base):
    __tablename__ = "classifications"
    id          = Column(Integer, primary_key=True)
    image_id    = Column(Integer, ForeignKey("images.image_id", ondelete="CASCADE"), nullable=False)
    class_id    = Column(Integer, nullable=False)
    confidence  = Column(Float, nullable=False)
    created_at  = Column(TIMESTAMP, server_default=text("NOW()"), nullable=False)

Image.classifications = relationship("Classification", back_populates="image")
Classification.image     = relationship("Image", back_populates="classifications")