import { Link } from "react-router-dom";
import {
  BookOpen,
  PlayCircle,
  Clock3,
  GraduationCap,
  User,
} from "lucide-react";

export default function ContinueLearning({ enrollment }) {
  if (!enrollment) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

        <div className="flex flex-col items-center text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">

            <BookOpen
              size={44}
              className="text-indigo-600"
            />

          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Continue Learning
          </h2>

          <p className="mt-3 max-w-md text-slate-500">
            You haven't enrolled in any course yet.
            Start learning today and build your skills.
          </p>

          <Link
            to="/courses"
            className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Browse Courses
          </Link>

        </div>

      </div>
    );
  }

  const course = enrollment.courseId;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="grid lg:grid-cols-[340px_1fr]">

        {/* Thumbnail */}

        <div className="relative">

          {course.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-full min-h-[260px] w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[260px] items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-600 text-7xl font-bold text-white">
              {course.title.charAt(0)}
            </div>
          )}

          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-indigo-700 backdrop-blur">
            Continue Learning
          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col p-8">

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {course.title}
          </h2>

          {course.subtitle && (
            <p className="mt-3 text-slate-500">
              {course.subtitle}
            </p>
          )}

          {/* Metadata */}

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">

            {course.faculty && (
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <User size={16} />
                {course.faculty}
              </div>
            )}

            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
              <BookOpen size={16} />
              {enrollment.totalLessons} Lessons
            </div>

            {course.duration && (
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <Clock3 size={16} />
                {course.duration}
              </div>
            )}

            {course.difficulty && (
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <GraduationCap size={16} />
                {course.difficulty}
              </div>
            )}

          </div>

          {/* Progress */}

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-slate-800">
                  Your Progress
                </h3>

                <p className="text-sm text-slate-500">
                  {enrollment.completedLessons} of{" "}
                  {enrollment.totalLessons} lessons completed
                </p>

              </div>

              <div className="text-right">

                <div className="text-3xl font-bold text-indigo-600">
                  {enrollment.progressPercent}%
                </div>

                <div className="text-xs uppercase tracking-wider text-slate-400">
                  Completed
                </div>

              </div>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-700"
                style={{
                  width: `${enrollment.progressPercent}%`,
                }}
              />

            </div>

          </div>

          {/* Footer */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="rounded-xl bg-indigo-50 px-5 py-3">

              <p className="text-sm font-medium text-indigo-700">
                Keep going! You're making great progress.
              </p>

            </div>

            <Link
              to={`/my-learning/${enrollment._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <PlayCircle size={18} />

              Resume Course

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}