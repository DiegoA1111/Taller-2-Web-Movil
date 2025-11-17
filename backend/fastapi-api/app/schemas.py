from pydantic import BaseModel
from typing import Optional

# Esquema base para un videojuego
class VideoGameBase(BaseModel):
    title: str
    genre: str
    platform: str
    release_year: int
    rating: float
    background_image: Optional[str] = None

# Esquema para la creación de un videojuego (no se necesita el ID)
class VideoGameCreate(VideoGameBase):
    pass

# Esquema para la actualización de un videojuego (todos los campos son opcionales)
class VideoGameUpdate(BaseModel):
    title: Optional[str] = None
    genre: Optional[str] = None
    platform: Optional[str] = None
    release_year: Optional[int] = None
    rating: Optional[float] = None
    background_image: Optional[str] = None

# Esquema para leer/devolver un videojuego (incluye el ID)
class VideoGame(VideoGameBase):
    id: int

    class Config:
        orm_mode = True
