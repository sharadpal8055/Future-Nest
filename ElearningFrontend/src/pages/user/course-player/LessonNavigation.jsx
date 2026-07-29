import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LessonNavigation({
  currentIndex,
  totalLessons,
  onPrevious,
  onNext,
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalLessons - 1;

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center justify-between">

        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 transition ${
            isFirst
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gray-800 text-white hover:bg-black"
          }`}
        >
          <ChevronLeft size={18} />
          Previous Lesson
        </button>

        {/* Lesson Counter */}
        <div className="rounded-lg bg-gray-100 px-5 py-3 text-sm font-medium text-gray-600">
          Lesson{" "}
          <span className="font-bold">
            {currentIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-bold">
            {totalLessons}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 transition ${
            isLast
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Next Lesson
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}