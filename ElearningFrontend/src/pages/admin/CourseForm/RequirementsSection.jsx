import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function RequirementsSection({
  form,
  setForm,
}) {
  const [requirement, setRequirement] = useState("");

  const addRequirement = () => {
    const value = requirement.trim();

    if (!value) return;

    if (form.requirements.includes(value)) {
      setRequirement("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      requirements: [
        ...prev.requirements,
        value,
      ],
    }));

    setRequirement("");
  };

  const removeRequirement = (index) => {
    setForm((prev) => ({
      ...prev,
      requirements:
        prev.requirements.filter(
          (_, i) => i !== index
        ),
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-indigo-100 p-3">
          <Sparkles className="text-indigo-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Course Requirements
          </h2>

          <p className="text-sm text-slate-500">
            Skills students should already know.
          </p>
        </div>

      </div>

      <div className="flex flex-col gap-3 sm:flex-row">

        <input
          value={requirement}
          onChange={(e) =>
            setRequirement(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addRequirement();
            }
          }}
          placeholder="Example: Basic JavaScript"
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={addRequirement}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
        </button>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        {form.requirements.length === 0 && (
          <div className="w-full rounded-xl border border-dashed py-10 text-center text-slate-500">
            No requirements added.
          </div>
        )}

        {form.requirements.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-full bg-indigo-50 px-4 py-2"
          >
            <CheckCircle2
              size={16}
              className="text-indigo-600"
            />

            <span>{item}</span>

            <button
              type="button"
              onClick={() =>
                removeRequirement(index)
              }
            >
              <Trash2
                size={16}
                className="text-red-500"
              />
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}