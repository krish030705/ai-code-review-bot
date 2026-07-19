from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.models import models
from app.api import auth
from app.api import projects

app = FastAPI(title="AI Code Review Bot API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(?:localhost|127\.0\.0\.1):517[3-9]",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registers all routes defined in auth.py under their /api/auth prefix
app.include_router(auth.router)
# Registers all routes defined in projects.py under their /api/projects prefix
app.include_router(projects.router)

@app.get("/")
def read_root():
    return {"message": "AI Code Review Bot API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}