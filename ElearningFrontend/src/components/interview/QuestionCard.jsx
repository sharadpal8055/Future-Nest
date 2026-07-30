import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function QuestionCard({
  question,
  reload,
  onEdit,
}) {

  async function remove() {

    if (
      !window.confirm("Delete Question?")
    )
      return;

    await api.delete(
      `/interview/admin/question/${question._id}`
    );

    toast.success("Deleted");

    reload();

  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">
            {question.question}
          </h3>

          <p className="mt-3 whitespace-pre-wrap text-slate-600">
            {question.answer}
          </p>

          <div className="mt-4 flex gap-2">

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
              {question.difficulty}
            </span>

            {question.tags?.map(tag => (

              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm"
              >
                {tag}
              </span>

            ))}

          </div>

        </div>

        <div className="flex gap-3">

       <button
  onClick={() => onEdit(question)}
  className="rounded-lg p-2 hover:bg-gray-100"
>
  <Pencil size={18} />
</button>

          <button
            onClick={remove}
          >

            <Trash2 size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}