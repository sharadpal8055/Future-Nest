import { Eye, Download, Pencil, Trash2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { deleteNote } from "../../services/note.service";

export default function NoteRow({ note, reload, onEdit }) {
  async function remove() {
    const confirmed = window.confirm(`Delete "${note.title}"?`);

    if (!confirmed) return;

    try {
      await deleteNote(note._id);

      toast.success("Note deleted successfully");

      reload();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Failed to delete note");
    }
  }

  return (
    <tr className="hover:bg-slate-50 transition">
      {/* Note */}

      <td className="px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-red-100 p-3">
            <FileText size={22} className="text-red-600" />
          </div>

          <div>
            <h3 className="font-semibold">{note.title}</h3>

            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {note.description || "No description"}
            </p>
          </div>
        </div>
      </td>

      {/* Subject */}

      <td className="px-6 py-5">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
          {note.subject}
        </span>
      </td>

      {/* Uploaded By */}

      <td className="px-6 py-5">{note.uploadedBy?.name || "-"}</td>

      {/* Date */}

      <td className="px-6 py-5">
        {new Date(note.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}

      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">
          {/* View */}

      <Link
    to={`/library/notes/${note._id}`}
    className="rounded-lg p-2 hover:bg-slate-100"
>
    <Eye size={18} />
</Link>

          {/* Download */}

   <button
  onClick={() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/notes/${note._id}/download`;
  }}
  className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
>
  <Download size={18} />
</button>

          {/* Edit */}

          <button
            onClick={() => onEdit(note)}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}

          <button
            onClick={remove}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
