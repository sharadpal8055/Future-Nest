import DOMPurify from "dompurify";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  PlayCircle,
} from "lucide-react";

export default function LessonItem({ lesson, completed, onToggle }) {
  if (!lesson) return null;

  const safeHtml = lesson.contentHtml
    ? DOMPurify.sanitize(lesson.contentHtml)
    : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
              completed
                ? "bg-emerald-50 text-emerald-600"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            {completed ? (
              <CheckCircle2 size={22} />
            ) : (
              <BookOpen size={22} />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Lesson {lesson.order}
            </p>

            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
              {lesson.title}
            </h3>
          </div>
        </div>

        <button
          onClick={!completed ? onToggle : undefined}
          disabled={completed}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
            completed
              ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-indigo-200 bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 size={16} />
              Completed
            </>
          ) : (
            <>
              <Circle size={16} />
              Mark Complete
            </>
          )}
        </button>
      </div>

      {/* Lesson Content */}
      {safeHtml && (
        <div
          className="prose prose-slate max-w-none px-6 py-6 prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      )}

      {/* Footer */}
      {lesson.videoUrl && (
        <div className="border-t border-slate-100 px-6 py-5">
          <a
            href={lesson.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            <PlayCircle size={18} />
            Watch Lesson

            <ExternalLink size={15} />
          </a>
        </div>
      )}
    </div>
  );
}