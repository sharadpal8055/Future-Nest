import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  X,
  Save,
  HelpCircle,
  FileText,
  Tag,
  Layers,
} from "lucide-react";

export default function QuestionForm({
  subjectId,
  reload,
  close,
  question = null,
}) {
  const [questionText, setQuestionText] = useState(
    question?.question || ""
  );

  const [answer, setAnswer] = useState(
    question?.answer || ""
  );

  const [difficulty, setDifficulty] = useState(
    question?.difficulty || "Beginner"
  );

  const [tags, setTags] = useState(
    question?.tags?.join(", ") || ""
  );

  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (
      !questionText.trim() ||
      !answer.trim()
    ) {
      toast.error(
        "Question and Answer are required."
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        subject: subjectId,
        question: questionText.trim(),
        answer: answer.trim(),
        difficulty,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (question) {
        await api.put(
          `/interview/admin/question/${question._id}`,
          payload
        );

        toast.success(
          "Question updated successfully"
        );
      } else {
        await api.post(
          "/interview/admin/question",
          payload
        );

        toast.success(
          "Question added successfully"
        );
      }

      reload();
      close();
    } catch {
      toast.error("Unable to save question.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold">

              {question
                ? "Edit Question"
                : "Add Interview Question"}

            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Build your interview preparation
              database.
            </p>

          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="space-y-6 p-6">

          {/* Question */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium">

              <HelpCircle
                size={18}
                className="text-indigo-600"
              />

              Interview Question

            </label>

            <textarea
              rows={3}
              value={questionText}
              onChange={(e) =>
                setQuestionText(
                  e.target.value
                )
              }
              placeholder="Explain Virtual DOM in React."
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* Answer */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium">

              <FileText
                size={18}
                className="text-indigo-600"
              />

              Expected Answer

            </label>

            <textarea
              rows={10}
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              placeholder="Write a detailed explanation..."
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* Difficulty */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium">

              <Layers
                size={18}
                className="text-indigo-600"
              />

              Difficulty

            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>
                Beginner
              </option>

              <option>
                Intermediate
              </option>

              <option>
                Advanced
              </option>

            </select>

          </div>

          {/* Tags */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-medium">

              <Tag
                size={18}
                className="text-indigo-600"
              />

              Tags

            </label>

            <input
              value={tags}
              onChange={(e) =>
                setTags(
                  e.target.value
                )
              }
              placeholder="Hooks, React, DOM"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-sm text-slate-500">
              Separate multiple tags using commas.
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-white p-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={close}
            className="rounded-xl border px-5 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />

            {loading
              ? "Saving..."
              : question
              ? "Update Question"
              : "Save Question"}

          </button>

        </div>

      </form>
    </div>
  );
}