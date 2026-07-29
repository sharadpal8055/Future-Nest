import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function RequirementsSection({ form, setForm }) {
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
      requirements: [...prev.requirements, value],
    }));

    setRequirement("");
  };

  const removeRequirement = (index) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRequirement();
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Course Requirements
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add the skills or knowledge students should have before starting this
          course.
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Example: Basic JavaScript knowledge"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />

        <button
          type="button"
          onClick={addRequirement}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {form.requirements.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
          No requirements added yet.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {form.requirements.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-sm text-gray-700">
                {index + 1}. {item}
              </span>

              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}