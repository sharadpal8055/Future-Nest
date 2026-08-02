import { BookOpen, FileText } from "lucide-react";

export default function BasicInfoSection({ form, setForm }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex items-start gap-4">
        <div className="rounded-xl bg-indigo-100 p-3">
          <BookOpen className="text-indigo-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            This information appears on the course landing page.
          </p>
        </div>
      </div>

      <div className="space-y-7">

        {/* Course Title */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Course Title
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            maxLength={120}
            placeholder="Complete React Bootcamp"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
          "
            required
          />

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>
              Choose a clear and descriptive title.
            </span>

            <span>{form.title.length}/120</span>
          </div>
        </div>

        {/* Subtitle */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Subtitle
          </label>

          <input
            type="text"
            maxLength={180}
            placeholder="Master React, Hooks, Redux and Next.js"
            value={form.subtitle}
            onChange={(e) =>
              setForm({
                ...form,
                subtitle: e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-4
            focus:ring-indigo-100
          "
          />

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>
              Keep it concise and engaging.
            </span>

            <span>{form.subtitle.length}/180</span>
          </div>
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Course Description
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">

            <FileText
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              rows={8}
              placeholder="Explain what students will learn, why they should take this course, and what makes it unique..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="
              w-full
              resize-y
              rounded-xl
              border
              border-slate-300
              py-3
              pl-12
              pr-4
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100
            "
              required
            />

          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>
              A detailed description improves enrollments.
            </span>

            <span>
              {form.description.length} characters
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}