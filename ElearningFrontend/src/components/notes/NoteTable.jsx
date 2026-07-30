import NoteRow from "./NoteRow";

export default function NoteTable({
  notes,
  loading,
  reload,
  onEdit,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          Loading notes...
        </p>
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Notes Found
        </h2>

        <p className="mt-2 text-slate-500">
          Upload your first note to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Note
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Uploaded By
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Uploaded On
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {notes.map((note) => (
              <NoteRow
                key={note._id}
                note={note}
                reload={reload}
                onEdit={onEdit}
              />
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}