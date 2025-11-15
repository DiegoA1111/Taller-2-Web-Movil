# Taller 2 - Videojuegos API (FastAPI)

API para gestionar una colección de videojuegos.

## Cómo ejecutar

1.  **Crear y activar un entorno virtual:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Linux/macOS
    .venv\Scripts\Activate.ps1 # Windows
    ```

2.  **Instalar dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Crear la base de datos y poblarla con datos de ejemplo:**
    ```bash
    python seed.py
    ```

4.  **Ejecutar el servidor:**
    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

La API estará disponible en `http://127.0.0.1:8000`.
La documentación interactiva (Swagger UI) se encuentra en `http://127.0.0.1:8000/docs`.
