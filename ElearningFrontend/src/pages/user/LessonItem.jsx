import DOMPurify from "dompurify";

export default function LessonItem({ lesson, completed, onToggle }) {
  if (!lesson) return null;

  const safeHtml = lesson.contentHtml
    ? DOMPurify.sanitize(lesson.contentHtml)
    : null;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
          <p className="text-xs text-gray-500">Lesson {lesson.order}</p>
        </div>

        <button
          onClick={!completed ? onToggle : undefined}
          disabled={completed}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold
            ${completed
              ? "bg-green-100 text-green-700"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
        >
          {completed ? "Completed ✓" : "Mark Complete"}
        </button>
      </div>

      {safeHtml && (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      )}

      {lesson.videoUrl && (
        <a
          href={lesson.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:underline"
        >
          ▶ Watch video
        </a>
      )}
    </div>
  );
}
