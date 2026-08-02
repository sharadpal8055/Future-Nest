import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  Pencil,
  Trash2,
  ChevronRight,
  BookOpen,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

export default function SubjectCard({
  subject,
  reload,
  onOpen,
  onEdit,
}) {
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this subject?")) return;

    try {
      setLoading(true);

      await api.delete(
        `/interview/admin/subject/${subject._id}`
      );

      toast.success("Subject deleted");

      reload();
    } catch {
      toast.error("Unable to delete subject");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-indigo-100
            text-indigo-600
          "
          >
            <BookOpen size={26} />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              {subject.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {subject.slug}
            </p>

          </div>

        </div>

        <MoreVertical
          size={18}
          className="text-slate-400"
        />

      </div>

      {/* Stats */}

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">

        <div className="text-sm text-slate-500">
          Interview Questions
        </div>

        <div className="mt-2 text-3xl font-bold text-indigo-600">
          {subject.questionCount || 0}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(subject)}
            className="
              rounded-xl
              border
              p-2.5
              transition
              hover:bg-indigo-50
              hover:text-indigo-600
            "
          >
            <Pencil size={18} />
          </button>

          <button
            disabled={loading}
            onClick={remove}
            className="
              rounded-xl
              border
              p-2.5
              text-red-500
              transition
              hover:bg-red-50
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

        <button
          onClick={() => onOpen(subject)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-4
            py-2.5
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          Manage

          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}