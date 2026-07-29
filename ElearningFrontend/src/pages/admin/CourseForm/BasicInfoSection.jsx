export default function BasicInfoSection({ form, setForm }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed to students on the course page.
        </p>
      </div>

      <div className="space-y-5">
        {/* Course Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Course Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Complete React Bootcamp"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            maxLength={120}
            required
          />

          <div className="mt-1 text-right text-xs text-gray-400">
            {form.title.length}/120
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Subtitle
          </label>

          <input
            type="text"
            placeholder="Build modern web applications using React."
            value={form.subtitle}
            onChange={(e) =>
              setForm({
                ...form,
                subtitle: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            maxLength={180}
          />

          <div className="mt-1 text-right text-xs text-gray-400">
            {form.subtitle.length}/180
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Course Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={6}
            placeholder="Write a detailed description about your course..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          />

          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>
              Explain what students will learn in this course.
            </span>

            <span>{form.description.length} characters</span>
          </div>
        </div>
      </div>
    </section>
  );
}