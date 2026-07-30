import { useState } from "react";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  createNote,
  updateNote,
} from "../../services/note.service";

export default function NoteForm({
  note = null,
  reload,
  close,
}) {
  const [title, setTitle] = useState(note?.title || "");
  const [subject, setSubject] = useState(note?.subject || "");
  const [description, setDescription] = useState(
    note?.description || ""
  );
  const [tags, setTags] = useState(
    note?.tags?.join(", ") || ""
  );

  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] = useState(false);

  function handleFile(file) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setPdf(file);
  }

  async function submit(e) {
    e.preventDefault();

    if (!title.trim())
      return toast.error("Title is required");

    if (!subject.trim())
      return toast.error("Subject is required");

    if (!note && !pdf)
      return toast.error("Please upload a PDF");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("tags", tags);

      if (pdf) {
        formData.append("pdf", pdf);
      }

      if (note) {
        await updateNote(note._id, formData);

        toast.success("Note updated successfully");
      } else {
        await createNote(formData);

        toast.success("Note uploaded successfully");
      }

      reload();

      close();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <form
        onSubmit={submit}
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            {note ? "Edit Note" : "Upload Note"}
          </h2>

          <button
            type="button"
            onClick={close}
          >
            <X />
          </button>

        </div>

        <div className="space-y-5 p-6">

          {/* Title */}

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Note Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          {/* Subject */}

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          />

          {/* Description */}

          <textarea
            rows={5}
            className="w-full rounded-xl border p-3"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          {/* Tags */}

          <input
            className="w-full rounded-xl border p-3"
            placeholder="react, hooks, context"
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
            }
          />

          {/* Upload */}

          <label
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition hover:border-indigo-500 hover:bg-indigo-50"
            onDragOver={(e) =>
              e.preventDefault()
            }
            onDrop={(e) => {
              e.preventDefault();

              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <UploadCloud
              size={40}
              className="mb-3 text-indigo-600"
            />

            <p className="font-semibold">
              Drag & Drop PDF
            </p>

            <p className="text-sm text-slate-500">
              or click to browse
            </p>

            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) =>
                handleFile(e.target.files[0])
              }
            />
          </label>

          {/* Preview */}

          {(pdf || note?.pdf) && (
            <div className="rounded-xl border bg-slate-50 p-4">

              <div className="flex items-center gap-3">

                <FileText className="text-red-600" />

                <div>

                  <p className="font-medium">

                    {pdf
                      ? pdf.name
                      : "Current PDF"}

                  </p>

                  {pdf && (
                    <p className="text-sm text-slate-500">
                      {(pdf.size / 1024 / 1024).toFixed(
                        2
                      )}{" "}
                      MB
                    </p>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            type="button"
            onClick={close}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            {note
              ? "Update Note"
              : "Upload Note"}
          </button>

        </div>
      </form>
    </div>
  );
}