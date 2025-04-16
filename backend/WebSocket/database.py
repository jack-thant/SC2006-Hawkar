from database1 import DatabaseFactory

database = DatabaseFactory.getDatabase("sqlite")
database.connect()  # connect to database

engine = database.engine
Base = database.Base
SessionLocal = database.SessionLocal


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
