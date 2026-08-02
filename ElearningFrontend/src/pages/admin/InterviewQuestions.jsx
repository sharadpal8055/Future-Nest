import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  ArrowLeft,
  Plus,
  Search,
  MessageSquare,
  BookOpen,
} from "lucide-react";

import QuestionForm from "../../components/interview/QuestionForm";
import QuestionCard from "../../components/interview/QuestionCard";

export default function InterviewQuestions({
  subject,
  goBack,
}) {
  const subjectId = subject._id;

  const [questions, setQuestions] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingQuestion, setEditingQuestion] =
    useState(null);

  const [search, setSearch] = useState("");

  async function loadQuestions() {
    try {
      const res = await api.get(
        `/interview/questions/${subjectId}`
      );

      setQuestions(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, [subjectId]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) =>
      `${question.question || ""} ${question.answer || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [questions, search]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <button
              onClick={goBack}
              className="mb-5 flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />

              Back to Subjects
            </button>

            <h1 className="text-3xl font-bold">
              {subject.name}
            </h1>

            <p className="mt-2 text-slate-500">
              Manage interview questions for this
              subject.
            </p>

          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />

            Add Question
          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-slate-500">
                Total Questions
              </div>

              <div className="mt-2 text-3xl font-bold">
                {questions.length}
              </div>

            </div>

            <MessageSquare
              size={34}
              className="text-indigo-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-slate-500">
                Subject
              </div>

              <div className="mt-2 text-2xl font-bold">
                {subject.name}
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
          placeholder="Search questions..."
          className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
        />

      </div>

      {/* Questions */}

      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">

          <MessageSquare
            size={56}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Questions Found
          </h3>

          <p className="mt-2 text-slate-500">
            Add your first interview question.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              reload={loadQuestions}
              onEdit={setEditingQuestion}
            />
          ))}

        </div>
      )}

      {(showForm || editingQuestion) && (
        <QuestionForm
          subjectId={subjectId}
          question={editingQuestion}
          reload={loadQuestions}
          close={() => {
            setShowForm(false);
            setEditingQuestion(null);
          }}
        />
      )}

    </div>
  );
}