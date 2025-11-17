from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/games",
    tags=["Videojuegos"],
    responses={404: {"description": "No encontrado"}},
)

@router.post("/", response_model=schemas.VideoGame)
def create_videogame(videogame: schemas.VideoGameCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo videojuego.
    """
    return crud.create_videogame(db=db, videogame=videogame)

@router.get("/", response_model=List[schemas.VideoGame])
def read_videogames(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtiene una lista de todos los videojuegos.
    """
    videogames = crud.get_videogames(db, skip=skip, limit=limit)
    return videogames

@router.get("/{videogame_id}", response_model=schemas.VideoGame)
def read_videogame(videogame_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un videojuego por su ID.
    """
    db_videogame = crud.get_videogame(db, videogame_id=videogame_id)
    if db_videogame is None:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    return db_videogame

@router.put("/{videogame_id}", response_model=schemas.VideoGame)
def update_videogame(videogame_id: int, videogame: schemas.VideoGameUpdate, db: Session = Depends(get_db)):
    """
    Actualiza un videojuego existente.
    """
    db_videogame = crud.update_videogame(db, videogame_id=videogame_id, videogame=videogame)
    if db_videogame is None:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    return db_videogame

@router.delete("/{videogame_id}", response_model=schemas.VideoGame)
def delete_videogame(videogame_id: int, db: Session = Depends(get_db)):
    """
    Elimina un videojuego.
    """
    db_videogame = crud.delete_videogame(db, videogame_id=videogame_id)
    if db_videogame is None:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    return db_videogame
