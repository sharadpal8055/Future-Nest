
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";

export default function SubjectCard({
  subject,
  reload,
  onOpen,onEdit,
}) {

  const remove = async () => {

    if (!window.confirm("Delete subject?")) return;

    await api.delete(
      `/interview/admin/subject/${subject._id}`
    );

    toast.success("Deleted");

    reload();

  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        {subject.name}
      </h2>

      <p className="mt-2 text-slate-500">
        Slug : {subject.slug}
      </p>

      <div className="mt-6 flex justify-between">

        <div className="flex gap-3">

         <button
  onClick={() => onEdit(subject)}
  className="rounded-lg p-2 hover:bg-gray-100"
>
  <Pencil size={18} />
</button>

          <button onClick={remove}>

            <Trash2 size={18} />

          </button>

        </div>

       <button
  onClick={() => onOpen(subject)}
  className="rounded-lg p-2 hover:bg-gray-100"
>
  <ChevronRight />
</button>

      </div>

    </div>
  );
}