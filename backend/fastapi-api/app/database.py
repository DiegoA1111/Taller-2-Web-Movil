import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Usar una variable de entorno para la URL de la base de datos, con un valor por defecto
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./instance/dev.db")

# Crear el motor de la base de datos
engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} # Necesario solo para SQLite
)

# Crear una clase de sesión para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base para los modelos de SQLAlchemy
Base = declarative_base()

# Dependencia para obtener una sesión de base de datos en los endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
