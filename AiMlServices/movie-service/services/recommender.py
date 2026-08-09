import pickle
from pathlib import Path


# ============================================================
# MODEL PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"


# ============================================================
# LOAD MODELS
# ============================================================

with open(MODEL_DIR / "movie.pkl", "rb") as f:
    movie = pickle.load(f)

with open(MODEL_DIR / "similarity.pkl", "rb") as f:
    similarity = pickle.load(f)


# ============================================================
# GET ALL MOVIES
# ============================================================

def get_all_movies():
    """
    Return list of all movie titles.
    Used for search/autocomplete.
    """
    return movie["title"].tolist()


# ============================================================
# RECOMMEND MOVIES
# ============================================================

def recommend(movie_name: str):
    """
    Return top 5 movies similar to the selected movie.
    """

    if movie_name not in movie["title"].values:
        return []

    movie_index = movie[movie["title"] == movie_name].index[0]

    distances = similarity[movie_index]

    movies_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    recommendations = []

    for item in movies_list:
        recommendations.append({
            "title": movie.iloc[item[0]]["title"]
        })

    return recommendations