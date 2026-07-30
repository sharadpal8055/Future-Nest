import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Plus } from "lucide-react";

import SubjectForm from "../../components/interview/SubjectForm";
import SubjectCard from "../../components/interview/SubjectCard";
import InterviewQuestions from "./InterviewQuestions";

export default function InterviewSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);
  const loadSubjects = async () => {
    try {
      const res = await api.get("/interview/subjects");
      setSubjects(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  if (selectedSubject) {
    return (
      <InterviewQuestions
        subject={selectedSubject}
        goBack={() => setSelectedSubject(null)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Subjects</h1>

          <p className="text-slate-500">
            Manage interview preparation content.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Subject
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
  <SubjectCard
    key={subject._id}
    subject={subject}
    reload={loadSubjects}
    onOpen={setSelectedSubject}
    onEdit={setEditingSubject}
  />
))}
      </div>

      {(open || editingSubject) && (
        <SubjectForm
          subject={editingSubject}
          close={() => {
            setOpen(false);
            setEditingSubject(null);
          }}
          reload={loadSubjects}
        />
      )}
    </div>
  );
}
