import {
  Eye,
  Download,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function NoteCard({
  note,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="mb-5 flex items-center gap-4">

        <div className="rounded-xl bg-red-100 p-3">

          <FileText
            className="text-red-600"
          />

        </div>

        <div>

          <h3 className="font-semibold">

            {note.title}

          </h3>

          <p className="text-sm text-slate-500">

            {note.subject}

          </p>

        </div>

      </div>

      <p className="line-clamp-3 text-sm text-slate-600">

        {note.description}

      </p>

      <div className="mt-6 flex gap-3">

        <Link
          to={`/library/notes/${note._id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2 text-white"
        >

          <Eye size={18}/>

          View

        </Link>

 <button
  onClick={() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/notes/${note._id}/download`;
  }}
  className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
>
  <Download size={18} />
</button>

      </div>

    </div>
  );
}