import {
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

export default function LessonContent({
  lesson,
  completed,
  onToggleComplete,
}) {
  if (!lesson) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a lesson to begin learning.
      </div>
    );
  }

  // Convert normal YouTube URL to embed URL
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
    <div className="space-y-6">

      {/* Lesson Header */}

      <div className="border-b pb-5">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-2 text-indigo-600">

              <PlayCircle size={20} />

              <span className="text-sm font-medium">
                Lesson {lesson.order}
              </span>

            </div>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {lesson.title}
            </h1>

          </div>

          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-2 rounded-lg px-5 py-2 font-medium transition ${
              completed
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <CheckCircle2 size={18} />

            {completed
              ? "Completed"
              : "Mark Complete"}
          </button>

        </div>

      </div>

      {/* Video */}

      {lesson.videoUrl && (
        <div className="overflow-hidden rounded-xl border shadow">

          <iframe
            src={getEmbedUrl(lesson.videoUrl)}
            title={lesson.title}
            className="aspect-video w-full"
            allowFullScreen
          />

        </div>
      )}

      {/* Lesson Content */}

      <div className="rounded-xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Lesson Notes
        </h2>

        {lesson.contentHtml ? (
          <div
            className="prose prose-indigo max-w-none"
            dangerouslySetInnerHTML={{
              __html: lesson.contentHtml,
            }}
          />
        ) : (
          <p className="text-gray-500">
            No lesson content available.
          </p>
        )}

      </div>

    </div>
  );
}