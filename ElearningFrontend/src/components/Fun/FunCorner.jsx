import {
  Film,
  BookOpen,
  Brain,
  Music4,
  Sparkles,
  BarChart3,
} from "lucide-react";

import ToolCard from "./ToolCard";

export default function FunCorner() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* ================= HERO ================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 px-8 py-12 text-white shadow-2xl">
          {/* Decorative Circles */}

          <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              <Sparkles size={16} />

              FutureNest AI Tools
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              Fun Corner
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-indigo-100 md:text-lg">
              Explore AI-powered tools, recommendation engines,
              coding utilities and productivity features designed
              to make your learning journey more enjoyable.
            </p>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-slate-900">
              1
            </h3>

            <p className="mt-2 text-slate-500">
              Available Tool
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-slate-900">
              5+
            </h3>

            <p className="mt-2 text-slate-500">
              Upcoming Features
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-slate-900">
              AI
            </h3>

            <p className="mt-2 text-slate-500">
              Recommendation Engine
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-slate-900">
              Free
            </h3>

            <p className="mt-2 text-slate-500">
              For Every Learner
            </p>
          </div>
        </div>

        {/* ================= SECTION ================= */}

        <div className="mt-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Explore Tools
              </h2>

              <p className="mt-2 text-slate-500">
                AI tools and utilities built for FutureNest.
              </p>
            </div>
          </div>

          {/* ================= GRID ================= */}

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <ToolCard
              title="Movie Recommender"
              description="Discover movies you'll love using an AI-powered recommendation engine based on your favourite films."
              icon={<Film size={30} />}
              to="/fun/movie"
              badge="NEW"
              available={true}
              gradient="from-indigo-600 to-violet-600"
            />

            <ToolCard
              title="Book Recommender"
              description="Find books based on your interests and reading history."
              icon={<BookOpen size={30} />}
              available={false}
              gradient="from-emerald-600 to-teal-600"
            />

            <ToolCard
              title="AI Quiz Generator"
              description="Generate quizzes instantly for interview preparation and revision."
              icon={<Brain size={30} />}
              available={false}
              gradient="from-pink-600 to-rose-600"
            />

            <ToolCard
              title="Music Recommender"
              description="Coding playlists and mood-based recommendations."
              icon={<Music4 size={30} />}
              available={false}
              gradient="from-orange-500 to-red-500"
            />

            <ToolCard
              title="Coding Analytics"
              description="Track your coding journey across multiple platforms."
              icon={<BarChart3 size={30} />}
              badge="Soon"
              available={false}
              gradient="from-cyan-600 to-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}