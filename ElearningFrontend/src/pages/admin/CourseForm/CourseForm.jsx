import { useEffect, useState } from "react";

import BasicInfoSection from "./BasicInfoSection";
import DetailsSection from "./DetailsSection";
import PricingSection from "./PricingSection";
import RequirementsSection from "./RequirementsSection";
import OutcomesSection from "./OutcomesSection";
import LessonsSection from "./LessonsSection";
import PublishSection from "./PublishSection";

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  faculty: "",
  category: "",
  difficulty: "beginner",
  language: "English",
  duration: "",
  price: "",
  thumbnailUrl: "",
  thumbnailPublicId: "",
  requirements: [],
  learningOutcomes: [],
  published: false,
  lessons: [],
};

export default function CourseForm({
  selected,
  onSave,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState(emptyForm);

useEffect(() => {
  if (selected) {
    setForm({
      ...emptyForm,
      ...selected,
      price: selected.price ?? "",
      thumbnailUrl: selected.thumbnailUrl || "",
      thumbnailPublicId:
        selected.thumbnailPublicId || "",
    });
  } else {
    setForm(emptyForm);
  }
}, [selected]);

  async function submit(e) {
    e.preventDefault();

   const payload = {
  ...form,

  title: form.title.trim(),

  subtitle: form.subtitle.trim(),

  description: form.description.trim(),

  faculty: form.faculty.trim(),

  category: form.category.trim(),

  duration: form.duration.trim(),

  thumbnailUrl:
    form.thumbnailUrl.trim(),

  thumbnailPublicId:
    form.thumbnailPublicId,

  price:
    form.price === ""
      ? 0
      : Number(form.price),
};
    await onSave(payload);

    if (!selected) {
      setForm(emptyForm);
    }
  }

  const disabled =
    loading ||
    !form.title.trim() ||
    !form.description.trim() ||
    !form.faculty.trim() ||
    !form.category.trim();

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Header */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {selected ? "Edit Course" : "Create New Course"}
            </h1>

            <p className="mt-2 text-slate-500">
              Fill in the course details below. Students will see this
              information before enrolling.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl bg-indigo-50 px-5 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Lessons
              </div>

              <div className="text-2xl font-bold">{form.lessons.length}</div>
            </div>

            <div className="rounded-xl bg-green-50 px-5 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Outcomes
              </div>

              <div className="text-2xl font-bold">
                {form.learningOutcomes.length}
              </div>
            </div>

            <div className="rounded-xl bg-yellow-50 px-5 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Requirements
              </div>

              <div className="text-2xl font-bold">
                {form.requirements.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}

      <div className="space-y-8">
        <BasicInfoSection form={form} setForm={setForm} />

        <DetailsSection form={form} setForm={setForm} />

        <PricingSection form={form} setForm={setForm} />

        <RequirementsSection form={form} setForm={setForm} />

        <OutcomesSection form={form} setForm={setForm} />

        <LessonsSection form={form} setForm={setForm} />

        <PublishSection form={form} setForm={setForm} />
      </div>

      {/* Sticky Footer */}

      <div className="sticky bottom-0 rounded-2xl border bg-white/95 p-5 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          {selected && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border px-6 py-3 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={disabled}
            className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
              disabled
                ? "cursor-not-allowed bg-slate-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading
              ? "Saving..."
              : selected
                ? "Update Course"
                : "Create Course"}
          </button>
        </div>
      </div>
    </form>
  );
}
