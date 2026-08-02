import {
  Globe,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ClipboardCheck,
  Image,
  GraduationCap,
} from "lucide-react";

export default function PublishSection({ form, setForm }) {
  const togglePublished = () => {
    setForm((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const checks = [
    {
      title: "Course title",
      done: form.title.trim().length > 0,
    },
    {
      title: "Description",
      done: form.description.trim().length > 0,
    },
    {
      title: "Thumbnail",
      done: form.thumbnailUrl.trim().length > 0,
    },
    {
      title: "Lessons",
      done: form.lessons.length > 0,
    },
    {
      title: "Requirements",
      done: form.requirements.length > 0,
    },
    {
      title: "Learning Outcomes",
      done: form.learningOutcomes.length > 0,
    },
  ];

  const completed = checks.filter(
    (item) => item.done
  ).length;

  const progress = Math.round(
    (completed / checks.length) * 100
  );

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Publish Course
        </h2>

        <p className="mt-2 text-slate-500">
          Review your course before making it
          available to students.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        {/* LEFT */}

        <div className="space-y-6">

          {/* Publish Toggle */}

          <div className="rounded-2xl border p-6">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold">
                  Visibility
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Decide whether students can
                  discover this course.
                </p>

              </div>

              <button
                type="button"
                onClick={togglePublished}
                className={`relative h-8 w-16 rounded-full transition ${
                  form.published
                    ? "bg-green-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                    form.published
                      ? "left-9"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            <div
              className={`mt-6 flex items-center gap-3 rounded-xl p-4 ${
                form.published
                  ? "bg-green-50"
                  : "bg-yellow-50"
              }`}
            >

              {form.published ? (
                <Globe className="text-green-600" />
              ) : (
                <EyeOff className="text-yellow-600" />
              )}

              <div>

                <div className="font-semibold">

                  {form.published
                    ? "Published"
                    : "Draft"}

                </div>

                <div className="text-sm text-slate-500">

                  {form.published
                    ? "Students can enroll in this course."
                    : "Only administrators can view this course."}

                </div>

              </div>

            </div>

          </div>

          {/* Checklist */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-lg font-semibold">
              Publishing Checklist
            </h3>

            <div className="space-y-4">

              {checks.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border p-4"
                >

                  <span>{item.title}</span>

                  {item.done ? (
                    <CheckCircle2 className="text-green-600" />
                  ) : (
                    <AlertTriangle className="text-yellow-500" />
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* Progress */}

          <div className="rounded-2xl bg-indigo-600 p-6 text-white">

            <div className="text-sm uppercase">
              Completion
            </div>

            <div className="mt-2 text-4xl font-bold">
              {progress}%
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-white transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-3 text-sm text-indigo-100">
              {completed} of {checks.length} items
              completed
            </div>

          </div>

          {/* Summary */}

          <div className="rounded-2xl border bg-slate-50 p-6">

            <h3 className="mb-5 text-lg font-semibold">
              Course Summary
            </h3>

            <div className="space-y-5">

              <SummaryItem
                icon={<BookOpen size={18} />}
                title="Lessons"
                value={form.lessons.length}
              />

              <SummaryItem
                icon={<ClipboardCheck size={18} />}
                title="Requirements"
                value={form.requirements.length}
              />

              <SummaryItem
                icon={<GraduationCap size={18} />}
                title="Outcomes"
                value={
                  form.learningOutcomes.length
                }
              />

              <SummaryItem
                icon={<Image size={18} />}
                title="Thumbnail"
                value={
                  form.thumbnailUrl
                    ? "Added"
                    : "Missing"
                }
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function SummaryItem({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
          {icon}
        </div>

        <span>{title}</span>

      </div>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}