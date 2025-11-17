from app.database import SessionLocal, engine
from app.models import VideoGame
from app.database import Base

# Crea la tabla si no existe
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()

    # Verificar si ya hay datos
    if db.query(VideoGame).first() is None:
        print("Poblando la base de datos con videojuegos de ejemplo...")
        
        videojuegos = [
            VideoGame(title="The Legend of Zelda: Breath of the Wild", genre="Aventura", platform="Nintendo Switch", release_year=2017, rating=9.7, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"),
            VideoGame(title="Red Dead Redemption 2", genre="Acción-Aventura", platform="PlayStation 4", release_year=2018, rating=9.8, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg"),
            VideoGame(title="The Witcher 3: Wild Hunt", genre="RPG", platform="PC", release_year=2015, rating=9.3, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg"),
            VideoGame(title="Super Mario Odyssey", genre="Plataformas", platform="Nintendo Switch", release_year=2017, rating=9.7, background_image="https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_SuperMarioOdyssey_image1600w.jpg"),
            VideoGame(title="God of War", genre="Acción-Aventura", platform="PlayStation 4", release_year=2018, rating=9.4, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg"),
            VideoGame(title="Elden Ring", genre="RPG de acción", platform="PC", release_year=2022, rating=9.6, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"),
            VideoGame(title="Hades", genre="Roguelike", platform="PC", release_year=2020, rating=9.3, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg"),
            VideoGame(title="Celeste", genre="Plataformas", platform="PC", release_year=2018, rating=9.4, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg"),
            VideoGame(title="Stardew Valley", genre="Simulación", platform="PC", release_year=2016, rating=8.8, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg"),
            VideoGame(title="Cyberpunk 2077", genre="RPG de acción", platform="PC", release_year=2020, rating=7.2, background_image="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"),
        ]

        db.add_all(videojuegos)
        db.commit()
        print("¡Base de datos poblada exitosamente!")
    else:
        print("La base de datos ya contiene datos. No se requiere poblamiento.")

    db.close()

if __name__ == "__main__":
    seed_data()
