import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.movie import router as movie_router


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="FutureNest AI Services",
    description="Movie Recommendation API",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

origins = [
    frontend_url,
    "http://localhost:5173",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=list(set(origins)),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():
    return {
        "success": True,
        "message": "FutureNest Movie Recommendation API is running",
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


# =========================================================
# MOVIE ROUTES
# =========================================================

app.include_router(movie_router)