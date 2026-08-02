import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  Plus,
  Search,
  BookOpen,
  FolderOpen,
} from "lucide-react";

import SubjectForm from "../../components/interview/SubjectForm";
import SubjectCard from "../../components/interview/SubjectCard";
import InterviewQuestions from "./InterviewQuestions";

export default function InterviewSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [editingSubject, setEditingSubject] =
    useState(null);

  async function loadSubjects() {
    try {
      const res = await api.get(
        "/interview/subjects"
      );

      setSubjects(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      subject.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [subjects, search]);

  if (selectedSubject) {
    return (
      <InterviewQuestions
        subject={selectedSubject}
        goBack={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Interview Subjects
          </h1>

          <p className="mt-2 text-slate-500">
            Organize interview preparation
            subjects and questions.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />

          Add Subject
        </button>

      </div>

      {/* Stats */}

      <div className="grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-slate-500">
                Total Subjects
              </div>

              <div className="mt-2 text-3xl font-bold">
                {subjects.length}
              </div>

            </div>

            <FolderOpen
              size={34}
              className="text-indigo-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-slate-500">
                Interview Library
              </div>

              <div className="mt-2 text-3xl font-bold">
                Ready
              </div>

            </div>

            <BookOpen
              size={34}
              className="text-green-600"
            />

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search subject..."
          className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
        />

      </div>

      {/* Empty */}

      {filteredSubjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">

          <FolderOpen
            size={56}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Subjects Found
          </h3>

          <p className="mt-2 text-slate-500">
            Create your first interview
            subject.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              reload={loadSubjects}
              onOpen={setSelectedSubject}
              onEdit={setEditingSubject}
            />
          ))}

        </div>
      )}

      {(open || editingSubject) && (
        <SubjectForm
          subject={editingSubject}
          reload={loadSubjects}
          close={() => {
            setOpen(false);
            setEditingSubject(null);
          }}
        />
      )}

    </div>
  );
}