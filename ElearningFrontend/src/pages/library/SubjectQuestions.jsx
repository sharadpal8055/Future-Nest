import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { getQuestions } from "../../services/interview.service";

function SubjectQuestions() {
  const { subjectId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    loadQuestions();
  }, [subjectId]);

  async function loadQuestions() {
    try {
      setLoading(true);

      const res = await getQuestions(subjectId);

      setQuestions(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.question.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "All" || q.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [questions, search, difficulty]);

  return (
    <div className="mx-auto max-w-6xl p-6">

      <Link
        to="/dashboard/library/interview"
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Subjects
      </Link>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <h1 className="text-3xl font-bold">
          Interview Questions
        </h1>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
            />

          </div>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
            className="rounded-xl border px-4"
          >
            <option>All</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

        </div>

      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Loading...
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          No questions found.
        </div>
      ) : (
        <div className="space-y-5">

          {filteredQuestions.map((question, index) => (
            <Link
              key={question._id}
              to={`/library/interview/question/${question._id}`}
              className="block rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >

              <div className="mb-3 flex items-center justify-between">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Question {index + 1}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold
                  ${
                    question.difficulty === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : question.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.difficulty}
                </span>

              </div>

              <h2 className="text-lg font-semibold">
                {question.question}
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                {question.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                  >
                    #{tag}
                  </span>
                ))}

              </div>

            </Link>
          ))}

        </div>
      )}
    </div>
  );
}

export default SubjectQuestions;