from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.movie import router as movie_router

app = FastAPI(
    title="FutureNest AI Services",
    description="Movie Recommendation API",
    version="1.0.0"
)

# ==========================================
# CORS
# ==========================================

origins = [
    "http://localhost:5173",      # React (Vite)
    "http://localhost:3000",      # Optional
    "https://future-nest-jet.vercel.app"   # Your deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Health Check
# ==========================================

@app.get("/")
def root():
    return {
        "success": True,
        "message": "FutureNest Movie Recommendation API is running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# ==========================================
# Routes
# ==========================================

app.include_router(movie_router)