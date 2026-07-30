import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getQuestion } from "../../services/interview.service";

function QuestionDetails() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestion();
  }, [id]);

  async function loadQuestion() {
    try {
      const res = await getQuestion(id);

      setQuestion(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="p-10 text-center">
        Question not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <Link
        to={`/library/interview/${question.subject._id}`}
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="rounded-2xl bg-white p-8 shadow">

        <div className="mb-6 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            {question.question}
          </h1>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            {question.difficulty}
          </span>

        </div>

        <div className="prose max-w-none whitespace-pre-wrap">
          {question.answer}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">

          {question.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              #{tag}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}

export default QuestionDetails;