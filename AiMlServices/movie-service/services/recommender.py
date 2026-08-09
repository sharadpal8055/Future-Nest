import pickle
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load ML files only once when server starts
movie = pickle.load(open(BASE_DIR / "models" / "movie.pkl", "rb"))
similarity = pickle.load(open(BASE_DIR / "models" / "similarity.pkl", "rb"))


def get_all_movies():
    """
    Return list of all movie titles.
    Used for autocomplete/search.
    """
    return movie["title"].tolist()


def recommend(movie_name: str):
    """
    Returns top 5 recommended movie names.
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
            "title": movie.iloc[item[0]].title
        })

    return recommendations