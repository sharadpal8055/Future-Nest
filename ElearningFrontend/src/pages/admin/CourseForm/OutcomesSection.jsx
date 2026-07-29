import { useState } from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function OutcomesSection({ form, setForm }) {
  const [outcome, setOutcome] = useState("");

  const addOutcome = () => {
    const value = outcome.trim();

    if (!value) return;

    if (form.learningOutcomes.includes(value)) {
      setOutcome("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, value],
    }));

    setOutcome("");
  };

  const removeOutcome = (index) => {
    setForm((prev) => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOutcome();
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Learning Outcomes
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Tell students what they will achieve after completing this course.
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Example: Build full-stack React applications"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />

        <button
          type="button"
          onClick={addOutcome}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {form.learningOutcomes.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
          No learning outcomes added yet.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {form.learningOutcomes.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-green-100 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />

                <span className="text-sm text-gray-700">
                  {item}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeOutcome(index)}
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