import { useEffect, useState } from "react";
import {
  Film,
  Sparkles,
  Loader2,
  Search,
  Star,
  Clapperboard,
} from "lucide-react";

import {
  getMovies,
  recommendMovie,
} from "../../services/movie.service";

export default function MovieRecommender() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // LOAD MOVIES
  // =========================================================

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      setLoadingMovies(true);
      setError("");

      const data = await getMovies();

      // -----------------------------------------------------
      // API normally returns:
      //
      // ["Avatar", "Titanic", "Batman"]
      //
      // But this also safely handles:
      //
      // [{ title: "Avatar" }, { title: "Titanic" }]
      // -----------------------------------------------------

      const normalizedMovies = Array.isArray(data)
        ? data
            .map((movie) =>
              typeof movie === "string"
                ? movie
                : movie?.title
            )
            .filter(Boolean)
        : [];

      // Remove duplicate titles
      const uniqueMovies = [...new Set(normalizedMovies)];

      setMovies(uniqueMovies);

      if (uniqueMovies.length > 0) {
        setSelectedMovie(uniqueMovies[0]);
      }
    } catch (err) {
      console.error("Failed to load movies:", err);

      setError(
        "Unable to load movies. Please make sure the AI service is running."
      );
    } finally {
      setLoadingMovies(false);
    }
  }

  // =========================================================
  // RECOMMEND MOVIES
  // =========================================================

  async function handleRecommend() {
    if (!selectedMovie) return;

    try {
      setLoadingRecommendations(true);
      setError("");

      const res = await recommendMovie(selectedMovie);

      // -----------------------------------------------------
      // Backend returns:
      //
      // {
      //   recommendations: [
      //     { title: "Movie 1" },
      //     { title: "Movie 2" }
      //   ]
      // }
      // -----------------------------------------------------

      const data = Array.isArray(res?.recommendations)
        ? res.recommendations
        : [];

      // Normalize recommendation objects
      const normalizedRecommendations = data
        .map((movie) => {
          if (typeof movie === "string") {
            return {
              title: movie,
            };
          }

          return {
            title: movie?.title || "Unknown Movie",
          };
        })
        .filter((movie) => movie.title);

      setRecommendations(normalizedRecommendations);
    } catch (err) {
      console.error("Recommendation error:", err);

      setRecommendations([]);

      setError(
        err?.response?.data?.detail ||
          "Unable to generate recommendations."
      );
    } finally {
      setLoadingRecommendations(false);
    }
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white shadow-xl sm:p-8 lg:p-10">

          <div className="flex flex-col gap-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Film size={28} />
              </div>

              <div>
                <p className="text-sm font-medium text-indigo-100">
                  FutureNest Fun Corner
                </p>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  Movie Recommendation
                </h1>
              </div>

            </div>

            <p className="max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
              Discover movies similar to your favourite ones using
              machine learning.
            </p>

          </div>
        </section>

        {/* =================================================
            SEARCH / SELECT
        ================================================= */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Search size={20} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Find Similar Movies
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a movie and let our ML model find similar titles.
              </p>
            </div>

          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row">

            {/* Movie Select */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={selectedMovie}
                onChange={(e) => {
                  setSelectedMovie(e.target.value);
                  setRecommendations([]);
                }}
                disabled={
                  loadingMovies || movies.length === 0
                }
                className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-11 pr-10 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              >

                {loadingMovies ? (
                  <option value="">
                    Loading movies...
                  </option>
                ) : movies.length === 0 ? (
                  <option value="">
                    No movies available
                  </option>
                ) : (
                  movies.map((movie, index) => (
                    <option
                      key={`${movie}-${index}`}
                      value={movie}
                    >
                      {movie}
                    </option>
                  ))
                )}

              </select>

            </div>

            {/* Recommend Button */}

            <button
              type="button"
              onClick={handleRecommend}
              disabled={
                !selectedMovie ||
                loadingRecommendations ||
                loadingMovies
              }
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loadingRecommendations ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Finding Movies...
                </>
              ) : (
                <>
                  <Sparkles size={18} />

                  Recommend
                </>
              )}

            </button>

          </div>

          {/* Error */}

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

        </section>

        {/* =================================================
            LOADING
        ================================================= */}

        {loadingRecommendations && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">

            <Loader2
              size={42}
              className="mx-auto animate-spin text-indigo-600"
            />

            <p className="mt-4 font-medium text-slate-700">
              Finding movies similar to{" "}
              <span className="text-indigo-600">
                {selectedMovie}
              </span>
              ...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Our recommendation model is working.
            </p>

          </div>
        )}

        {/* =================================================
            RECOMMENDATIONS
        ================================================= */}

        {!loadingRecommendations &&
          recommendations.length > 0 && (
            <section className="mt-10">

              {/* Heading */}

              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <Clapperboard
                      size={24}
                      className="text-indigo-600"
                    />

                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Recommended Movies
                    </h2>

                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Movies similar to{" "}
                    <span className="font-semibold text-slate-700">
                      {selectedMovie}
                    </span>
                  </p>

                </div>

                <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {recommendations.length} Recommendations
                </span>

              </div>

              {/* Movie Cards */}

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                {recommendations.map((movie, index) => (

                  <div
                    key={`${movie.title}-${index}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl"
                  >

                    {/* Top visual */}

                    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

                      {/* Decorative circles */}

                      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

                      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10" />

                      <Film
                        size={54}
                        className="relative text-white transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* Rank */}

                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-700 shadow-sm">
                        #{index + 1}
                      </span>

                    </div>

                    {/* Content */}

                    <div className="p-5">

                      <div className="flex items-center gap-1 text-yellow-500">

                        <Star
                          size={15}
                          fill="currentColor"
                        />

                        <span className="text-xs font-medium text-slate-500">
                          Recommended for you
                        </span>

                      </div>

                      <h3 className="mt-3 line-clamp-2 min-h-[56px] text-lg font-bold leading-7 text-slate-900">
                        {movie.title}
                      </h3>

                    </div>

                  </div>

                ))}

              </div>

            </section>
          )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loadingRecommendations &&
          recommendations.length === 0 &&
          selectedMovie &&
          !error && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Film size={28} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Ready to discover?
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Click Recommend to find movies similar to{" "}
                <span className="font-medium text-slate-700">
                  {selectedMovie}
                </span>
                .
              </p>

            </div>
          )}

      </div>
    </div>
  );
}