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
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      faculty: form.faculty.trim(),
      category: form.category.trim(),
      duration: form.duration.trim(),
      thumbnailUrl: form.thumbnailUrl.trim(),
      price: form.price === "" ? 0 : Number(form.price),
    };

    await onSave(payload);

    if (!selected) {
      setForm(emptyForm);
    }
  };

  const disabled =
    loading ||
    !form.title.trim() ||
    !form.description.trim() ||
    !form.faculty.trim() ||
    !form.category.trim();

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-2xl bg-white p-6 shadow-lg"
    >
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {selected ? "Edit Course" : "Create Course"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Fill the course information below.
        </p>
      </div>

      <BasicInfoSection form={form} setForm={setForm} />

      <DetailsSection form={form} setForm={setForm} />

      <PricingSection form={form} setForm={setForm} />

      <RequirementsSection form={form} setForm={setForm} />

      <OutcomesSection form={form} setForm={setForm} />

      <LessonsSection form={form} setForm={setForm} />

      <PublishSection form={form} setForm={setForm} />

      <div className="flex gap-3 pt-3">
        <button
          type="submit"
          disabled={disabled}
          className={`rounded-lg px-5 py-2 font-medium text-white transition ${
            disabled
              ? "cursor-not-allowed bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : selected ? "Update Course" : "Create Course"}
        </button>

        {selected && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
