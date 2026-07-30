import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function SubjectForm({
  close,
  reload,
  subject = null,
}) {
const [name, setName] = useState(subject?.name || "");

 async function submit(e) {
  e.preventDefault();

  if (subject) {
    await api.put(
      `/interview/admin/subject/${subject._id}`,
      { name }
    );

    toast.success("Subject Updated");
  } else {
    await api.post(
      "/interview/admin/subject",
      { name }
    );

    toast.success("Subject Created");
  }

  reload();
  close();
}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-xl bg-white p-6"
      >
        <h2 className="mb-6 text-xl font-bold">
  {subject ? "Edit Subject" : "Add Subject"}
</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="React"
          className="mb-6 w-full rounded border p-3"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={close}>
            Cancel
          </button>

         <button
  className="rounded bg-indigo-600 px-5 py-2 text-white"
>
  {subject ? "Update" : "Save"}
</button>
        </div>
      </form>
    </div>
  );
}
