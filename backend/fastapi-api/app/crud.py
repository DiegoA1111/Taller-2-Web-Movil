from sqlalchemy.orm import Session
from . import models, schemas

def get_videogame(db: Session, videogame_id: int):
    """
    Obtiene un videojuego por su ID.
    """
    return db.query(models.VideoGame).filter(models.VideoGame.id == videogame_id).first()

def get_videogames(db: Session, skip: int = 0, limit: int = 100):
    """
    Obtiene una lista de videojuegos con paginación.
    """
    return db.query(models.VideoGame).offset(skip).limit(limit).all()

def create_videogame(db: Session, videogame: schemas.VideoGameCreate):
    """
    Crea un nuevo videojuego en la base de datos.
    """
    db_videogame = models.VideoGame(**videogame.dict())
    db.add(db_videogame)
    db.commit()
    db.refresh(db_videogame)
    return db_videogame

def update_videogame(db: Session, videogame_id: int, videogame: schemas.VideoGameUpdate):
    """
    Actualiza un videojuego existente.
    """
    db_videogame = get_videogame(db, videogame_id)
    if db_videogame:
        update_data = videogame.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_videogame, key, value)
        db.commit()
        db.refresh(db_videogame)
    return db_videogame

def delete_videogame(db: Session, videogame_id: int):
    """
    Elimina un videojuego de la base de datos.
    """
    db_videogame = get_videogame(db, videogame_id)
    if db_videogame:
        db.delete(db_videogame)
        db.commit()
    return db_videogame
