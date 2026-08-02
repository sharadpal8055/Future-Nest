import {
  User,
  Layers,
  Clock3,
  GraduationCap,
  Globe,
  BookOpen,
} from "lucide-react";

export default function DetailsSection({ form, setForm }) {
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const Input = ({
    icon,
    label,
    children,
    required = false,
  }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800">
          Course Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure instructor information and course metadata.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">

        {/* Left */}

        <div className="grid gap-6 md:grid-cols-2">

          <Input
            label="Instructor"
            icon={<User size={18} />}
            required
          >
            <input
              value={form.faculty}
              onChange={(e) =>
                updateField(
                  "faculty",
                  e.target.value
                )
              }
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </Input>

          <Input
            label="Category"
            icon={<Layers size={18} />}
            required
          >
            <input
              value={form.category}
              onChange={(e) =>
                updateField(
                  "category",
                  e.target.value
                )
              }
              placeholder="Web Development"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </Input>

          <Input
            label="Difficulty"
            icon={
              <GraduationCap size={18} />
            }
          >
            <select
              value={form.difficulty}
              onChange={(e) =>
                updateField(
                  "difficulty",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="beginner">
                Beginner
              </option>

              <option value="intermediate">
                Intermediate
              </option>

              <option value="advanced">
                Advanced
              </option>
            </select>
          </Input>

          <Input
            label="Language"
            icon={<Globe size={18} />}
          >
            <select
              value={form.language}
              onChange={(e) =>
                updateField(
                  "language",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </Input>

          <Input
            label="Duration"
            icon={<Clock3 size={18} />}
          >
            <input
              value={form.duration}
              onChange={(e) =>
                updateField(
                  "duration",
                  e.target.value
                )
              }
              placeholder="12 Hours"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </Input>

          <Input
            label="Lessons"
            icon={<BookOpen size={18} />}
          >
            <div className="flex h-[50px] items-center rounded-xl border bg-slate-100 px-4 font-semibold text-slate-700">
              {form.lessons.length} Lesson
              {form.lessons.length !== 1 && "s"}
            </div>
          </Input>

        </div>

        {/* Right Summary */}

        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-lg">

          <h3 className="text-lg font-semibold">
            Course Summary
          </h3>

          <div className="mt-6 space-y-5">

            <div>
              <div className="text-xs uppercase text-indigo-200">
                Instructor
              </div>

              <div className="mt-1 font-medium">
                {form.faculty || "Not specified"}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-indigo-200">
                Category
              </div>

              <div className="mt-1 font-medium">
                {form.category || "-"}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-indigo-200">
                Difficulty
              </div>

              <div className="mt-1 capitalize font-medium">
                {form.difficulty}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-indigo-200">
                Language
              </div>

              <div className="mt-1">
                {form.language}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-indigo-200">
                Duration
              </div>

              <div className="mt-1">
                {form.duration || "-"}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-indigo-200">
                Lessons
              </div>

              <div className="mt-1">
                {form.lessons.length}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}