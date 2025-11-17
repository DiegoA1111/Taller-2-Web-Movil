from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import videogames

# Crea las tablas en la base de datos (si no existen)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Videojuegos",
    description="Una API para gestionar información de videojuegos.",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir el router de videojuegos
app.include_router(videogames.router)

@app.get("/", tags=["Root"])
def read_root():
    """
    Endpoint raíz para verificar que la API está funcionando.
    """
    return {"message": "Bienvenido a la API de Videojuegos!"}
