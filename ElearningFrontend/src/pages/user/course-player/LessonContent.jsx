import DOMPurify from "dompurify";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
} from "lucide-react";

export default function LessonContent({
  lesson,
  completed,
  onToggleComplete,
}) {
  if (!lesson) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
        <BookOpen
          size={44}
          className="mb-4 text-slate-300"
        />

        <h2 className="text-xl font-semibold text-slate-800">
          Select a lesson
        </h2>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Choose a lesson from the sidebar to start learning.
        </p>
      </div>
    );
  }

  const safeHtml = lesson.contentHtml
    ? DOMPurify.sanitize(lesson.contentHtml)
    : "";

  const getEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const videoId = new URL(url).searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (url.includes("youtu.be/")) {
        return `https://www.youtube.com/embed/${url.split("/").pop()}`;
      }

      return url;
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= Header ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">

              <PlayCircle size={18} />

              Lesson {lesson.order}

            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {lesson.title}
            </h1>

          </div>

          <button
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              completed
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <CheckCircle2 size={17} />

            {completed
              ? "Completed"
              : "Mark Complete"}
          </button>

        </div>

      </div>

      {/* ================= Video ================= */}

      {lesson.videoUrl && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">

          <iframe
            src={getEmbedUrl(lesson.videoUrl)}
            title={lesson.title}
            className="aspect-video w-full"
            allowFullScreen
          />

        </div>
      )}

      {/* ================= Notes ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">

            <BookOpen size={20} />

          </div>

          <div>

            <h2 className="font-semibold text-slate-900">
              Lesson Notes
            </h2>

            <p className="text-sm text-slate-500">
              Read the lesson material before continuing.
            </p>

          </div>

        </div>

        <div className="px-6 py-7">

          {safeHtml ? (
            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600"
              dangerouslySetInnerHTML={{
                __html: safeHtml,
              }}
            />
          ) : (
            <div className="rounded-xl bg-slate-50 p-8 text-center">

              <Clock3
                size={34}
                className="mx-auto mb-3 text-slate-300"
              />

              <p className="text-slate-500">
                No lesson notes available.
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}