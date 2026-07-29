import { ImageOff } from "lucide-react";

export default function PricingSection({ form, setForm }) {
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const thumbnail =
    form.thumbnailUrl?.trim() ||
    "https://placehold.co/600x340/e5e7eb/6b7280?text=Course+Thumbnail";

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Pricing & Thumbnail
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Set the course pricing and preview the course thumbnail.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Side */}
        <div className="space-y-5">
          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>

              <input
                type="number"
                min="0"
                placeholder="0"
                value={form.price}
                onChange={(e) =>
                  updateField("price", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Enter 0 to make this course free.
            </p>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Thumbnail URL
            </label>

            <input
              type="url"
              placeholder="https://example.com/course-thumbnail.jpg"
              value={form.thumbnailUrl}
              onChange={(e) =>
                updateField("thumbnailUrl", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            <p className="mt-1 text-xs text-gray-400">
              Paste a publicly accessible image URL.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Thumbnail Preview
          </label>

          <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
            <img
              src={thumbnail}
              alt="Course Thumbnail"
              className="h-56 w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x340/e5e7eb/6b7280?text=Invalid+Image";
              }}
            />

            <div className="border-t bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ImageOff size={16} />
                Live thumbnail preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}