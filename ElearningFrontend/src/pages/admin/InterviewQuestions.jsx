import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ArrowLeft, Plus } from "lucide-react";

import QuestionForm from "../../components/interview/QuestionForm";
import QuestionCard from "../../components/interview/QuestionCard";

export default function InterviewQuestions({
  subject,
  goBack,
}) {
  const subjectId = subject._id;

  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
const [editingQuestion, setEditingQuestion] = useState(null);
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

  return (
    <div className="mx-auto max-w-6xl p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={goBack}
            className="mb-4 flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Back to Subjects
          </button>

          <h1 className="text-3xl font-bold">
            {subject.name}
          </h1>

          <p className="mt-2 text-slate-500">
            Manage interview questions for this subject.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Question
        </button>
      </div>

      {/* Questions */}

      <div className="space-y-5">
        {questions.length === 0 ? (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <h3 className="text-lg font-semibold">
              No Questions Yet
            </h3>

            <p className="mt-2 text-gray-500">
              Start by adding your first interview question.
            </p>
          </div>
        ) : (
          questions.map((question) => (
           <QuestionCard
  key={question._id}
  question={question}
  reload={loadQuestions}
  onEdit={setEditingQuestion}
/>
          ))
        )}
      </div>

      {/* Add Question Modal */}

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