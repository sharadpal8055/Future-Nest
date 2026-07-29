import { Trophy } from "lucide-react";

export default function ProgressBar({
  progress,
  completed,
  total,
}) {
  const isCompleted =
    total > 0 && completed === total;

  return (
    <div className="space-y-3">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold text-gray-800">
            Course Progress
          </h3>

          <p className="text-sm text-gray-500">
            {completed} of {total} lessons completed
          </p>
        </div>

        <div className="text-right">

          <div className="text-2xl font-bold text-indigo-600">
            {progress}%
          </div>

          <div className="text-xs text-gray-500">
            Completed
          </div>

        </div>

      </div>

      {/* Progress Bar */}
      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Completion Card */}
      {isCompleted && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

          <div className="rounded-full bg-green-100 p-2">

            <Trophy
              size={24}
              className="text-green-600"
            />

          </div>

          <div>

            <h4 className="font-semibold text-green-700">
              Congratulations!
            </h4>

            <p className="text-sm text-green-600">
              You have completed this course.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}