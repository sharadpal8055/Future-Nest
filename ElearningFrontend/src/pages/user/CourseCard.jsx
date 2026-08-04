import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Globe,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function CourseCard({ course, onEnroll, enrolled }) {
  const difficultyColor = {
    beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-100 text-amber-700 border-amber-200",
    advanced: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const difficulty = (course.difficulty || "beginner").toLowerCase();

  return (
    <article
      className="
      group
      flex
      h-full
      flex-col
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-indigo-200
      hover:shadow-xl
    "
    >
      {/* ================= Thumbnail ================= */}

      <Link to={`/courses/${course._id}`} className="relative overflow-hidden">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="
            aspect-video
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
          />
        ) : (
          <div
            className="
            flex
            aspect-video
            items-center
            justify-center
            bg-gradient-to-br
            from-indigo-600
            via-violet-600
            to-purple-700
            text-6xl
            font-bold
            text-white
          "
          >
            {course.title.charAt(0)}
          </div>
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Difficulty */}

        <div className="absolute left-4 top-4">
          <span
            className={`
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
            backdrop-blur-md
            ${
              difficultyColor[difficulty] ||
              "bg-slate-100 text-slate-700 border-slate-200"
            }
          `}
          >
            {course.difficulty}
          </span>
        </div>

        {/* Rating */}

        <div
          className="
          absolute
          right-4
          top-4
          flex
          items-center
          gap-1
          rounded-full
          bg-black/60
          px-3
          py-1
          text-sm
          font-medium
          text-white
          backdrop-blur
        "
        >
          <Star size={15} className="fill-yellow-400 text-yellow-400" />

          {course.averageRating || "New"}
        </div>
      </Link>

      {/* ================= Content ================= */}

      <div className="flex flex-1 flex-col p-6">
        {/* Category */}

        <span
          className="
          w-fit
          rounded-full
          bg-indigo-50
          px-3
          py-1
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-indigo-700
        "
        >
          {course.category || "Course"}
        </span>

        {/* Title */}

        <Link
          to={`/courses/${course._id}`}
          className="
          mt-4
          line-clamp-2
          text-2xl
          font-bold
          tracking-tight
          text-slate-900
          transition
          hover:text-indigo-600
        "
        >
          {course.title}
        </Link>

        {/* Subtitle */}

        {course.subtitle && (
          <p
            className="
            mt-2
            line-clamp-2
            text-sm
            leading-6
            text-slate-500
          "
          >
            {course.subtitle}
          </p>
        )}

        {/* Description */}

        <p
          className="
          mt-4
          line-clamp-3
          flex-1
          text-sm
          leading-7
          text-slate-600
        "
        >
          {course.description}
        </p>

        {/* Instructor */}

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-700">
          <BookOpen size={16} className="text-indigo-600" />

          <span>{course.faculty || "Instructor"}</span>
        </div>

        {/* Metadata */}

        <div className="mt-5 flex flex-wrap gap-2">
          {course.duration && (
            <div
              className="
              flex
              items-center
              gap-1
              rounded-full
              bg-slate-100
              px-3
              py-1.5
              text-xs
              text-slate-700
            "
            >
              <Clock3 size={14} />

              {course.duration}
            </div>
          )}

          {course.language && (
            <div
              className="
              flex
              items-center
              gap-1
              rounded-full
              bg-slate-100
              px-3
              py-1.5
              text-xs
              text-slate-700
            "
            >
              <Globe size={14} />

              {course.language}
            </div>
          )}

          <div
            className="
            flex
            items-center
            gap-1
            rounded-full
            bg-slate-100
            px-3
            py-1.5
            text-xs
            text-slate-700
          "
          >
            <Users size={14} />

            {course.enrollmentCount || 0}
          </div>
        </div>

        {/* Footer */}

        <div className="mt-7 border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="
                text-xs
                uppercase
                tracking-wider
                text-slate-400
              "
              >
                Price
              </p>

              <h2 className="mt-1 text-3xl font-bold text-indigo-600">
                {course.price > 0 ? `₹${course.price}` : "Free"}
              </h2>
            </div>

            {enrolled ? (
              <div
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-emerald-100
                px-4
                py-3
                text-sm
                font-semibold
                text-emerald-700
              "
              >
                <CheckCircle2 size={17} />
                Enrolled
              </div>
            ) : (
              <button
                onClick={() => onEnroll(course)}
                className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                hover:-translate-y-0.5
                hover:bg-indigo-700
              "
              >
                {course.price > 0 ? "Buy Course" : "Enroll"}

                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
