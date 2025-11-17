from sqlalchemy import Column, Integer, String, Float
from .database import Base

class VideoGame(Base):
    __tablename__ = "videogames"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    genre = Column(String)
    platform = Column(String)
    release_year = Column(Integer)
    rating = Column(Float)
    background_image = Column(String, nullable=True)
