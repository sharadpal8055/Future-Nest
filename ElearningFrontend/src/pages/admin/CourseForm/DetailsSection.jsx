export default function DetailsSection({ form, setForm }) {
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">Course Details</h3>

        <p className="mt-1 text-sm text-gray-500">
          Configure instructor and course information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Faculty */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Instructor <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={form.faculty}
            onChange={(e) => updateField("faculty", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Web Development"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Difficulty
          </label>

          <select
            value={form.difficulty}
            onChange={(e) => updateField("difficulty", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="beginner">🟢 Beginner</option>
            <option value="intermediate">🟡 Intermediate</option>
            <option value="advanced">🔴 Advanced</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Language
          </label>

          <select
            value={form.language}
            onChange={(e) => updateField("language", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Duration
          </label>

          <input
            type="text"
            placeholder="12 Hours"
            value={form.duration}
            onChange={(e) => updateField("duration", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <p className="mt-1 text-xs text-gray-400">
            Example: 12 Hours, 6 Weeks, 45 Lessons
          </p>
        </div>

        {/* Lessons Count */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Lessons
          </label>

          <div className="flex h-[42px] items-center rounded-lg border border-gray-300 bg-gray-100 px-4 text-gray-700">
            {form.lessons.length} Lesson
            {form.lessons.length !== 1 ? "s" : ""}
          </div>

          <p className="mt-1 text-xs text-gray-400">Automatically updated.</p>
        </div>
      </div>
    </section>
  );
}
