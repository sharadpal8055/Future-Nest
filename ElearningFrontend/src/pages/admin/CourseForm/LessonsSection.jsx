import { useState } from "react";
import {
  Plus,
  Trash2,
  PlayCircle,
  FileText,
  Pencil,
  Save,
  X,
} from "lucide-react";

const emptyLesson = {
  title: "",
  contentHtml: "",
  videoUrl: "",
};

export default function LessonsSection({ form, setForm }) {
  const [lesson, setLesson] = useState(emptyLesson);
  const [editingIndex, setEditingIndex] = useState(null);

  const resetLesson = () => {
    setLesson(emptyLesson);
    setEditingIndex(null);
  };

  const saveLesson = () => {
    if (!lesson.title.trim()) return;

    if (editingIndex !== null) {
      const updated = [...form.lessons];

      updated[editingIndex] = {
        ...lesson,
        order: editingIndex + 1,
      };

      setForm((prev) => ({
        ...prev,
        lessons: updated,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        lessons: [
          ...prev.lessons,
          {
            ...lesson,
            order: prev.lessons.length + 1,
          },
        ],
      }));
    }

    resetLesson();
  };

  const editLesson = (index) => {
    setLesson(form.lessons[index]);
    setEditingIndex(index);
  };

  const removeLesson = (index) => {
    setForm((prev) => ({
      ...prev,
      lessons: prev.lessons
        .filter((_, i) => i !== index)
        .map((lesson, i) => ({
          ...lesson,
          order: i + 1,
        })),
    }));

    if (editingIndex === index) {
      resetLesson();
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Course Lessons
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Build your curriculum by adding lessons.
        </p>
      </div>

      {/* Lesson Form */}

      <div className="space-y-4 rounded-xl border bg-white p-5">

        <input
          type="text"
          placeholder="Lesson Title"
          value={lesson.title}
          onChange={(e) =>
            setLesson({
              ...lesson,
              title: e.target.value,
            })
          }
          className="w-full rounded-lg border px-4 py-2"
        />

        <textarea
          rows={5}
          placeholder="Lesson Content"
          value={lesson.contentHtml}
          onChange={(e) =>
            setLesson({
              ...lesson,
              contentHtml: e.target.value,
            })
          }
          className="w-full rounded-lg border px-4 py-2"
        />

        <input
          type="url"
          placeholder="Video URL"
          value={lesson.videoUrl}
          onChange={(e) =>
            setLesson({
              ...lesson,
              videoUrl: e.target.value,
            })
          }
          className="w-full rounded-lg border px-4 py-2"
        />

        <div className="flex gap-3">

          <button
            type="button"
            onClick={saveLesson}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            {editingIndex === null ? (
              <>
                <Plus size={18} />
                Add Lesson
              </>
            ) : (
              <>
                <Save size={18} />
                Update Lesson
              </>
            )}
          </button>

          {editingIndex !== null && (
            <button
              type="button"
              onClick={resetLesson}
              className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              <X size={18} />
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* Lesson List */}

      <div className="mt-6 space-y-4">

        {form.lessons.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-white p-8 text-center text-gray-500">
            No lessons added yet.
          </div>
        ) : (
          form.lessons.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between">

                <div>

                  <div className="flex items-center gap-2 font-semibold">

                    <PlayCircle
                      size={20}
                      className="text-indigo-600"
                    />

                    Lesson {item.order}

                  </div>

                  <div className="mt-2 text-lg">
                    {item.title}
                  </div>

                  {item.contentHtml && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <FileText size={16} />
                      {item.contentHtml.slice(0, 100)}
                      {item.contentHtml.length > 100 &&
                        "..."}
                    </div>
                  )}

                  {item.videoUrl && (
                    <div className="mt-2 text-sm text-blue-600">
                      🎥 Video Attached
                    </div>
                  )}

                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    onClick={() => editLesson(index)}
                    className="rounded-lg p-2 hover:bg-gray-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeLesson(index)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}