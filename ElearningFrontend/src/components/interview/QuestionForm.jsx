import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

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

 async function submit(e) {
  e.preventDefault();

  const payload = {
    subject: subjectId,
    question: questionText,
    answer,
    difficulty,
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };

  if (question) {
    await api.put(
      `/interview/admin/question/${question._id}`,
      payload
    );

    toast.success("Question Updated");
  } else {
    await api.post(
      "/interview/admin/question",
      payload
    );

    toast.success("Question Added");
  }

  reload();

  close();
}

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

      <form
        onSubmit={submit}
        className="w-full max-w-2xl rounded-2xl bg-white p-8"
      >

     <h2 className="mb-6 text-2xl font-bold">
  {question ? "Edit Question" : "Add Question"}
</h2>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Question"
     value={questionText}
onChange={(e) => setQuestionText(e.target.value)}
        />

        <textarea
          rows={8}
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Expected Answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />

        <select
          className="mb-4 w-full rounded-lg border p-3"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >

          <option>Beginner</option>

          <option>Intermediate</option>

          <option>Advanced</option>

        </select>

        <input
          className="mb-6 w-full rounded-lg border p-3"
          placeholder="Hooks, Rendering, DOM"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={close}
          >
            Cancel
          </button>

          <button
  className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
>
  {question ? "Update" : "Save"}
</button>

        </div>

      </form>

    </div>

  );
}