import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

import {
  getNotes,
} from "../../services/note.service";

import NoteGrid from "../../components/student-notes/NoteGrid";
import NoteFilters from "../../components/student-notes/NoteFilters";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [subject, setSubject] = useState("");

  async function loadNotes() {
    try {
      setLoading(true);

      const res = await getNotes({
        search,
        subject,
      });

      setNotes(res.data);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, [search, subject]);

  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <BookOpen
            className="text-indigo-600"
            size={34}
          />

          <div>

            <h1 className="text-3xl font-bold">

              Study Notes

            </h1>

            <p className="text-slate-500">

              Browse notes uploaded by instructors.

            </p>

          </div>

        </div>

      </div>

      <NoteFilters
        search={search}
        setSearch={setSearch}
        subject={subject}
        setSubject={setSubject}
      />

      <NoteGrid
        notes={notes}
        loading={loading}
      />

    </div>
  );
}