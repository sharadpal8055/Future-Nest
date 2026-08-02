import { useRef, useState } from "react";
import {
  Image,
  IndianRupee,
  BadgeCheck,
  UploadCloud,
  Trash2,
  Loader2,
  Link2,
} from "lucide-react";
import toast from "react-hot-toast";
import { uploadThumbnail } from "../../../services/course.service";

export default function PricingSection({ form, setForm }) {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const thumbnail =
    form.thumbnailUrl ||
    "https://placehold.co/900x500/f1f5f9/64748b?text=Course+Thumbnail";

  const isFree = Number(form.price || 0) === 0;

  async function handleFile(file) {
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5 MB.");
      return;
    }

    try {
      setUploading(true);

      const res = await uploadThumbnail(file);

      updateField("thumbnailUrl", res.url);

      updateField("thumbnailPublicId", res.publicId);

      toast.success("Thumbnail uploaded");
    } catch (err) {
      console.error(err);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeThumbnail() {
    updateField("thumbnailUrl", "");
    updateField("thumbnailPublicId", "");
  }

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header */}
{form.thumbnailUrl && !uploading && (
<div className="flex items-center gap-2 text-green-600 text-sm mt-3">

Thumbnail uploaded successfully

</div>
)}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Pricing & Thumbnail</h2>

        <p className="mt-2 text-slate-500">
          Configure pricing and upload a beautiful course thumbnail.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT */}

        <div className="space-y-8">
          {/* Price */}

          <div>
            <label className="mb-2 flex items-center gap-2 font-semibold">
              <IndianRupee size={18} className="text-green-600" />
              Course Price
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                ₹
              </span>

              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div
              className={`mt-5 rounded-xl border p-4 ${
                isFree
                  ? "border-green-200 bg-green-50"
                  : "border-indigo-200 bg-indigo-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <BadgeCheck
                  className={isFree ? "text-green-600" : "text-indigo-600"}
                />

                <div>
                  <div className="font-semibold">
                    {isFree ? "Free Course" : "Premium Course"}
                  </div>

                  <div className="text-sm text-gray-500">
                    {isFree
                      ? "Students can enroll instantly."
                      : `Price ₹${form.price}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload */}

          <div>
            <label className="mb-3 flex items-center gap-2 font-semibold">
              <UploadCloud size={18} className="text-indigo-600" />
              Upload Thumbnail
            </label>

            <div
              onClick={() => {
                if (!uploading) {
                  fileInputRef.current?.click();
                }
              }}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
            >
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 size={36} className="animate-spin text-indigo-600" />

                  <p className="mt-3">Uploading...</p>
                </div>
              ) : (
                <>
                  <UploadCloud size={42} className="mx-auto text-indigo-600" />

                  <p className="mt-4 font-semibold">Click to Upload</p>

                  <p className="mt-1 text-sm text-gray-500">JPG • PNG • WEBP</p>
                </>
              )}
            </div>

            <input
              hidden
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFile(e.target.files[0]);
                e.target.value = "";
              }}
            />
          </div>

          {/* URL */}

          <div>
            <label className="mb-2 flex items-center gap-2 font-semibold">
              <Link2 size={18} className="text-indigo-600" />
              Or Paste Image URL
            </label>

            <input
               disabled={uploading}
   value={form.thumbnailUrl}
              onChange={(e) => updateField("thumbnailUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {form.thumbnailUrl && (
            <button
              type="button"
                 disabled={uploading}
              onClick={removeThumbnail}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 font-medium text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={18} />
              Remove Thumbnail
            </button>
          )}
        </div>

        {/* RIGHT */}

        <div>
          <h3 className="mb-4 font-semibold">Live Preview</h3>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
            <img
              src={thumbnail}
              alt="Thumbnail"
             className="aspect-video w-full object-cover transition-all duration-300"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/900x500/f1f5f9/64748b?text=Invalid+Image";
              }}
            />

            <div className="space-y-4 p-6">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                {form.category || "Category"}
              </span>

              <h2 className="line-clamp-2 text-2xl font-bold">
                {form.title || "Course Title"}
              </h2>

              <p className="line-clamp-3 text-sm text-slate-500">
                {form.subtitle || form.description || "Course description..."}
              </p>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Image size={18} className="text-indigo-600" />

                  <span className="text-sm">Preview</span>
                </div>

                <span
                  className={`text-2xl font-bold ${
                    isFree ? "text-green-600" : "text-indigo-600"
                  }`}
                >
                  {isFree ? "FREE" : `₹${form.price}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
