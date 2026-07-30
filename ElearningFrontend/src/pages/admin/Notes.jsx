import { useEffect, useState } from "react";
import { Plus, Search, FileText } from "lucide-react";

import { getNotes } from "../../services/note.service";

import NoteTable from "../../components/notes/NoteTable";
import NoteForm from "../../components/notes/NoteForm";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [subject, setSubject] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [editingNote, setEditingNote] = useState(null);

  async function loadNotes() {
    try {
      setLoading(true);

      const res = await getNotes({
        search,
        subject,
      });

      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, [search, subject]);

  return (
    <div className="mx-auto max-w-7xl p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3">

              <FileText className="text-indigo-600" />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Notes Management
              </h1>

              <p className="mt-1 text-slate-500">
                Upload and manage study notes for students.
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />

          Upload Note
        </button>

      </div>

      {/* Filters */}

      <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">

        <div className="grid gap-4 md:grid-cols-2">

          <div className="relative">

            <Search
              className="absolute left-4 top-3.5 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search notes..."
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
            />

          </div>

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">
              All Subjects
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="Operating System">
              Operating System
            </option>

            <option value="Computer Networks">
              Computer Networks
            </option>

            <option value="OOP">
              OOP
            </option>

            <option value="React">
              React
            </option>

            <option value="Node.js">
              Node.js
            </option>

          </select>

        </div>

      </div>

      <NoteTable
        notes={notes}
        loading={loading}
        reload={loadNotes}
        onEdit={setEditingNote}
      />

      {(openForm || editingNote) && (
        <NoteForm
          note={editingNote}
          reload={loadNotes}
          close={() => {
            setOpenForm(false);
            setEditingNote(null);
          }}
        />
      )}

    </div>
  );
}