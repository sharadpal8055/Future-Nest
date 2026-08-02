import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  BookOpen,
  Save,
  X,
} from "lucide-react";

export default function SubjectForm({
  close,
  reload,
  subject = null,
}) {
  const [name, setName] = useState(
    subject?.name || ""
  );

  const [loading, setLoading] =
    useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Subject name is required.");
      return;
    }

    try {
      setLoading(true);

      if (subject) {
        await api.put(
          `/interview/admin/subject/${subject._id}`,
          {
            name: name.trim(),
          }
        );

        toast.success(
          "Subject updated successfully"
        );
      } else {
        await api.post(
          "/interview/admin/subject",
          {
            name: name.trim(),
          }
        );

        toast.success(
          "Subject created successfully"
        );
      }

      reload();
      close();
    } catch {
      toast.error(
        "Unable to save subject."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <form
        onSubmit={submit}
        className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold">

              {subject
                ? "Edit Subject"
                : "Create Subject"}

            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Organize interview questions
              by subject.
            </p>

          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium">

              <BookOpen
                size={18}
                className="text-indigo-600"
              />

              Subject Name

            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Example: React"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              autoFocus
            />

            <p className="mt-2 text-sm text-slate-500">
              This subject will group
              related interview questions.
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t bg-slate-50 p-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={close}
            className="rounded-xl border px-5 py-3 transition hover:bg-white"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />

            {loading
              ? "Saving..."
              : subject
              ? "Update Subject"
              : "Create Subject"}

          </button>

        </div>

      </form>

    </div>
  );
}