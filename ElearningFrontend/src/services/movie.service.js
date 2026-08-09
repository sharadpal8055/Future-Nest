import axios from "axios";

const MOVIE_API_URL = import.meta.env.VITE_MOVIE_API_URL;

if (!MOVIE_API_URL) {
  throw new Error("VITE_MOVIE_API_URL is not defined");
}

const movieAPI = axios.create({
  baseURL: MOVIE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getMovies() {
  const res = await movieAPI.get("/movies");
  return res.data.movies;
}

export async function recommendMovie(movie) {
  const res = await movieAPI.post("/movies/recommend", {
    movie,
  });

  return res.data;
}