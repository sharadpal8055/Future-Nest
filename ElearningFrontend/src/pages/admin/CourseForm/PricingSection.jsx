import {
  Image,
  IndianRupee,
  BadgeCheck,
} from "lucide-react";

export default function PricingSection({
  form,
  setForm,
}) {
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const thumbnail =
    form.thumbnailUrl?.trim() ||
    "https://placehold.co/600x340/e2e8f0/64748b?text=Course+Thumbnail";

  const isFree =
    Number(form.price || 0) === 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          Pricing & Thumbnail
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure pricing and preview how the
          course card will appear.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* LEFT */}

        <div className="space-y-6">

          {/* Price */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <IndianRupee
                size={18}
                className="text-green-600"
              />
              Course Price
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ₹
              </span>

              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) =>
                  updateField(
                    "price",
                    e.target.value
                  )
                }
                placeholder="0"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  py-3
                  pl-10
                  pr-4
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>

            <p className="mt-2 text-sm text-slate-500">
              Enter
              <span className="font-semibold">
                {" "}0{" "}
              </span>
              to make this course free.
            </p>

          </div>

          {/* Status */}

          <div
            className={`rounded-xl border p-5 ${
              isFree
                ? "border-green-200 bg-green-50"
                : "border-indigo-200 bg-indigo-50"
            }`}
          >

            <div className="flex items-center gap-3">

              <BadgeCheck
                className={
                  isFree
                    ? "text-green-600"
                    : "text-indigo-600"
                }
              />

              <div>

                <div className="font-semibold">

                  {isFree
                    ? "Free Course"
                    : "Premium Course"}

                </div>

                <div className="text-sm text-slate-500">

                  {isFree
                    ? "Students can enroll without payment."
                    : `Students pay ₹${form.price} before enrollment.`}

                </div>

              </div>

            </div>

          </div>

          {/* Thumbnail URL */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

              <Image
                size={18}
                className="text-indigo-600"
              />

              Thumbnail URL

            </label>

            <input
              type="url"
              placeholder="https://example.com/course.jpg"
              value={form.thumbnailUrl}
              onChange={(e) =>
                updateField(
                  "thumbnailUrl",
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            />

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <h3 className="mb-4 text-sm font-semibold text-slate-600">
            Live Preview
          </h3>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">

            <img
              src={thumbnail}
              alt="Thumbnail"
              className="h-56 w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x340/e2e8f0/64748b?text=Invalid+Image";
              }}
            />

            <div className="space-y-3 p-5">

              <div>

                <h3 className="line-clamp-2 text-lg font-bold">
                  {form.title ||
                    "Course Title"}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-slate-500">
                  {form.subtitle ||
                    form.description ||
                    "Course description..."}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

                  {form.category || "Category"}

                </span>

                <span
                  className={`text-xl font-bold ${
                    isFree
                      ? "text-green-600"
                      : "text-indigo-600"
                  }`}
                >
                  {isFree
                    ? "FREE"
                    : `₹${form.price}`}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}