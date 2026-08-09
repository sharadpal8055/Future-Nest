from fastapi import APIRouter
from schemas.movie import MovieRequest, MovieResponse
from services.recommender import recommend, get_all_movies

router = APIRouter(
    prefix="/movies",
    tags=["Movie Recommendation"]
)


@router.get("/")
def all_movies():
    """
    Return all movie titles.
    Used for search/autocomplete.
    """
    return {
        "success": True,
        "count": len(get_all_movies()),
        "movies": get_all_movies()
    }


@router.post("/recommend", response_model=MovieResponse)
def recommend_movies(request: MovieRequest):
    """
    Recommend top 5 similar movies.
    """

    recommendations = recommend(request.movie)

    return {
        "recommendations": recommendations
    }