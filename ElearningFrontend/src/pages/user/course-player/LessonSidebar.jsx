import { CheckCircle2, CirclePlay } from "lucide-react";

export default function LessonSidebar({
  lessons,
  progress,
  selectedLessonIndex,
  onSelect,
}) {
  return (
    <aside className="w-80 rounded-xl bg-white shadow h-[calc(100vh-180px)] overflow-hidden">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Course Content</h2>

        <p className="mt-1 text-sm text-gray-500">{lessons.length} Lessons</p>
      </div>

      {/* Lesson List */}
      <div className="overflow-y-auto h-full">
        {lessons.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No lessons available.
          </div>
        ) : (
          lessons.map((lesson, index) => {
            const completed = !!progress[lesson._id];
            const active = index === selectedLessonIndex;

            return (
              <button
                key={lesson._id}
                onClick={() => onSelect(index)}
                className={`w-full border-b px-5 py-4 text-left transition
                  ${
                    active
                      ? "bg-indigo-50 border-l-4 border-indigo-600"
                      : "hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div className="mt-1">
                    {completed ? (
                      <CheckCircle2 size={20} className="text-green-600" />
                    ) : (
                      <CirclePlay size={20} className="text-gray-400" />
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1">
                    <div className="text-xs uppercase text-gray-400">
                      Lesson {index + 1}
                    </div>

                    <h3
                      className={`mt-1 font-medium ${
                        active ? "text-indigo-700" : "text-gray-800"
                      }`}
                    >
                      {lesson.title}
                    </h3>

                    {lesson.videoUrl && (
                      <p className="mt-1 text-xs text-gray-500">
                        🎥 Video Lesson
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
