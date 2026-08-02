import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  PlayCircle,
  FileText,
  Video,
  GripVertical,
  ChevronRight,
} from "lucide-react";

const emptyLesson = {
  title: "",
  contentHtml: "",
  videoUrl: "",
};

export default function LessonsSection({ form, setForm }) {
  const [lesson, setLesson] = useState(emptyLesson);

  const [editingIndex, setEditingIndex] = useState(null);

  const reset = () => {
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

    reset();
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
      reset();
    }
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Curriculum Builder
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Organize lessons for your course.
          </p>

        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-3">

          <div className="text-xs uppercase text-slate-500">
            Total Lessons
          </div>

          <div className="text-2xl font-bold text-indigo-600">
            {form.lessons.length}
          </div>

        </div>

      </div>

      {/* Lesson Editor */}

      <div className="rounded-2xl border bg-slate-50 p-6">

        <div className="grid gap-5">

          <input
            placeholder="Lesson title"
            value={lesson.title}
            onChange={(e) =>
              setLesson({
                ...lesson,
                title: e.target.value,
              })
            }
            className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          />

          <textarea
            rows={5}
            placeholder="Lesson content..."
            value={lesson.contentHtml}
            onChange={(e) =>
              setLesson({
                ...lesson,
                contentHtml: e.target.value,
              })
            }
            className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            placeholder="Video URL"
            value={lesson.videoUrl}
            onChange={(e) =>
              setLesson({
                ...lesson,
                videoUrl: e.target.value,
              })
            }
            className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          />

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={saveLesson}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
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
                onClick={reset}
                className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-slate-100"
              >
                <X size={18} />
                Cancel
              </button>
            )}

          </div>

        </div>

      </div>

      {/* Lesson List */}

      <div className="mt-8 space-y-5">

        {form.lessons.length === 0 ? (

          <div className="rounded-2xl border border-dashed py-14 text-center">

            <PlayCircle
              size={55}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-5 text-xl font-semibold">
              No Lessons Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Start building your curriculum.
            </p>

          </div>

        ) : (

          form.lessons.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >

              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex gap-4">

                  <div className="pt-1">

                    <GripVertical className="text-slate-400" />

                  </div>

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                        {item.order}
                      </div>

                      <div>

                        <h3 className="text-lg font-semibold">
                          {item.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-500">

                          <span className="flex items-center gap-1">
                            <FileText size={15} />
                            {item.contentHtml.length} chars
                          </span>

                          {item.videoUrl && (
                            <span className="flex items-center gap-1 text-green-600">
                              <Video size={15} />
                              Video Added
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    {item.contentHtml && (
                      <p className="mt-4 line-clamp-2 text-sm text-slate-500">
                        {item.contentHtml}
                      </p>
                    )}

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={() => editLesson(index)}
                    className="rounded-xl border p-3 hover:bg-slate-100"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeLesson(index)}
                    className="rounded-xl border border-red-200 p-3 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>

                  <button
                    type="button"
                    className="rounded-xl border p-3 hover:bg-slate-100"
                  >
                    <ChevronRight size={18} />
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