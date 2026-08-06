import { useState } from "react";
import {
  Search,
  Sparkles,
  Film,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieRecommender() {
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy recommendations for UI preview
  const [recommendations, setRecommendations] = useState([
    {
      title: "Interstellar",
      year: "2014",
    },
    {
      title: "The Dark Knight",
      year: "2008",
    },
    {
      title: "Inception",
      year: "2010",
    },
    {
      title: "The Prestige",
      year: "2006",
    },
    {
      title: "Tenet",
      year: "2020",
    },
  ]);

  async function handleRecommend() {
    if (!movie.trim()) return;

    setLoading(true);

    // Temporary delay for UI
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-10">

        {/* Back */}

        <Link
          to="/fun"
          className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back to Fun Corner
        </Link>

        {/* Hero */}

        <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 p-10 text-white shadow-xl">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                <Sparkles size={16} />
                AI Recommendation Engine
              </div>

              <h1 className="mt-6 text-5xl font-extrabold">
                Movie Recommender
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-indigo-100">
                Discover movies similar to your favourites using an
                AI-powered recommendation system.
              </p>

            </div>

            <Film size={120} className="opacity-30" />

          </div>

        </div>

        {/* Search */}

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Find Similar Movies
          </h2>

          <p className="mt-2 text-slate-500">
            Enter a movie name to receive personalized recommendations.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Search movie..."
                className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-indigo-500"
              />

            </div>

            <button
              onClick={handleRecommend}
              disabled={loading}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Finding...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Recommend
                </>
              )}
            </button>

          </div>

        </div>

        {/* Recommendations */}

        <div className="mt-12">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                Recommended Movies
              </h2>

              <p className="mt-2 text-slate-500">
                Movies you may enjoy.
              </p>

            </div>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {recommendations.map((movie) => (

              <div
                key={movie.title}
                className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-xl"
              >

                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600">

                  <Film
                    size={70}
                    className="text-white opacity-90 transition duration-300 group-hover:scale-110"
                  />

                </div>

                <div className="p-5">

                  <h3 className="line-clamp-2 text-lg font-bold">
                    {movie.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {movie.year}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}