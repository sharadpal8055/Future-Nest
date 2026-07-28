import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  faculty: "",
  category: "",
  difficulty: "beginner",
  price: "",
  thumbnailUrl: "",
  lessons: []
};

const emptyLesson = {
  title: "",
  contentHtml: "",
  videoUrl: ""
};

export default function CourseForm({
  selected,
  onSave,
  onCancel,
  loading = false
}) {
  const [form, setForm] = useState(emptyForm);
  const [lessonDraft, setLessonDraft] = useState(emptyLesson);

  /* ===============================
     Populate form when editing
  ================================ */
  useEffect(() => {
    if (selected) {
      setForm({
        title: selected.title || "",
        description: selected.description || "",
        faculty: selected.faculty || "",
        category: selected.category || "",
        difficulty: selected.difficulty || "beginner",
        price: selected.price ?? "",
        thumbnailUrl: selected.thumbnailUrl || "",
        lessons: Array.isArray(selected.lessons) ? selected.lessons : []
      });
    } else {
      // 🔥 reset when switching from edit → create
      setForm(emptyForm);
      setLessonDraft(emptyLesson);
    }
  }, [selected]);

  /* ===============================
     Lesson Handlers (FIXED)
  ================================ */
  const addLesson = () => {
    if (!lessonDraft.title.trim()) return;

    setForm(prev => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          title: lessonDraft.title.trim(),
          contentHtml: lessonDraft.contentHtml.trim() || "",
          videoUrl: lessonDraft.videoUrl.trim() || "",
          order: prev.lessons.length + 1
        }
      ]
    }));

    // ✅ always reset lesson inputs
    setLessonDraft(emptyLesson);
  };

  const removeLesson = (index) => {
    setForm(prev => ({
      ...prev,
      lessons: prev.lessons
        .filter((_, i) => i !== index)
        .map((l, i) => ({ ...l, order: i + 1 }))
    }));
  };

  /* ===============================
     Submit (ZOD-SAFE + RESET)
  ================================ */
  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      faculty: form.faculty.trim(),
      category: form.category.trim(),
      difficulty: form.difficulty,
      price: form.price === "" ? undefined : Number(form.price),
      thumbnailUrl: form.thumbnailUrl.trim() || undefined,
      lessons: form.lessons.map((l, i) => ({
        title: l.title.trim(),
        contentHtml: l.contentHtml || "",
        videoUrl: l.videoUrl || "",
        order: i + 1
      }))
    };

    await onSave(payload);

    // 🔥 RESET ONLY AFTER CREATE (NOT EDIT)
    if (!selected) {
      setForm(emptyForm);
      setLessonDraft(emptyLesson);
    }
  };

  /* ===============================
     Validation
  ================================ */
  const disabled =
    loading ||
    !form.title.trim() ||
    !form.description.trim() ||
    !form.category.trim() ||
    !form.faculty.trim();

  /* ===============================
     UI
  ================================ */
  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl shadow p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {selected ? "Edit Course" : "Create Course"}
      </h2>

      <input
        placeholder="Faculty / Instructor Name"
        className="w-full border p-2 rounded"
        value={form.faculty}
        onChange={e => setForm({ ...form, faculty: e.target.value })}
        required
      />

      <input
        placeholder="Course Title"
        className="w-full border p-2 rounded"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Course Description"
        className="w-full border p-2 rounded"
        rows={3}
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        placeholder="Category"
        className="w-full border p-2 rounded"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      />

      <select
        className="w-full border p-2 rounded"
        value={form.difficulty}
        onChange={e => setForm({ ...form, difficulty: e.target.value })}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <input
        type="number"
        min="0"
        placeholder="Price (0 = Free)"
        className="w-full border p-2 rounded"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Thumbnail URL"
        className="w-full border p-2 rounded"
        value={form.thumbnailUrl}
        onChange={e => setForm({ ...form, thumbnailUrl: e.target.value })}
      />

      {/* Lessons */}
      <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
        <h3 className="font-semibold">Lessons</h3>

        <input
          placeholder="Lesson Title"
          className="w-full border p-2 rounded"
          value={lessonDraft.title}
          onChange={e =>
            setLessonDraft({ ...lessonDraft, title: e.target.value })
          }
        />

        <textarea
          placeholder="Lesson Content"
          className="w-full border p-2 rounded"
          rows={3}
          value={lessonDraft.contentHtml}
          onChange={e =>
            setLessonDraft({ ...lessonDraft, contentHtml: e.target.value })
          }
        />

        <input
          placeholder="Video URL"
          className="w-full border p-2 rounded"
          value={lessonDraft.videoUrl}
          onChange={e =>
            setLessonDraft({ ...lessonDraft, videoUrl: e.target.value })
          }
        />

        <button
          type="button"
          onClick={addLesson}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Add Lesson
        </button>

        {form.lessons.map((l, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{i + 1}. {l.title}</span>
            <button
              type="button"
              onClick={() => removeLesson(i)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          disabled={disabled}
          className={`px-4 py-2 rounded text-white ${
            disabled
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {selected && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
