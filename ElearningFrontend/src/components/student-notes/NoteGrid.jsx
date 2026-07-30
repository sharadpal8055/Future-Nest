import NoteCard from "./NoteCard";

export default function NoteGrid({
  notes,
  loading,
}) {
  if (loading)
    return (
      <div className="text-center py-16">

        Loading Notes...

      </div>
    );

  if (!notes.length)
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">

        <h2 className="text-xl font-semibold">

          No Notes Found

        </h2>

      </div>
    );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {notes.map(note => (

        <NoteCard
          key={note._id}
          note={note}
        />

      ))}

    </div>
  );
}