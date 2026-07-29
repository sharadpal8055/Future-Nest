import { Globe, Eye, CheckCircle2 } from "lucide-react";

export default function PublishSection({ form, setForm }) {
  const togglePublished = () => {
    setForm((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Publish Settings
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Choose whether this course is available to students or saved as a
          draft.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div
              className={`rounded-full p-3 ${
                form.published
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {form.published ? (
                <Globe size={24} />
              ) : (
                <Eye size={24} />
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                {form.published
                  ? "Course Published"
                  : "Draft Course"}
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                {form.published
                  ? "Students can discover and enroll in this course."
                  : "Only administrators can view this course."}
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            type="button"
            onClick={togglePublished}
            className={`relative h-7 w-14 rounded-full transition ${
              form.published
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                form.published
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Status Card */}
        <div
          className={`mt-6 rounded-lg border p-4 ${
            form.published
              ? "border-green-200 bg-green-50"
              : "border-yellow-200 bg-yellow-50"
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2
              size={18}
              className={
                form.published
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            />

            {form.published
              ? "Published"
              : "Draft"}
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {form.published
              ? "This course will appear in the public course catalog and students can enroll."
              : "This course is saved as a draft. You can continue editing it before publishing."}
          </p>
        </div>

        {/* Summary */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-gray-100 p-4">
            <div className="text-xs uppercase text-gray-500">
              Lessons
            </div>

            <div className="mt-1 text-xl font-bold">
              {form.lessons.length}
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <div className="text-xs uppercase text-gray-500">
              Requirements
            </div>

            <div className="mt-1 text-xl font-bold">
              {form.requirements.length}
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <div className="text-xs uppercase text-gray-500">
              Learning Outcomes
            </div>

            <div className="mt-1 text-xl font-bold">
              {form.learningOutcomes.length}
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
            <div className="text-xs uppercase text-gray-500">
              Course Price
            </div>

            <div className="mt-1 text-xl font-bold">
              {Number(form.price || 0) === 0
                ? "Free"
                : `$${Number(form.price).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}