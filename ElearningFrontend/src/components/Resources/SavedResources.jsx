import { useEffect, useState } from "react";
import {
  Bookmark,
  ExternalLink,
  Link as LinkIcon,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  getResources,
  createResource,
  deleteResource,
} from "../../services/resource.service";

function SavedResources() {
  const [resources, setResources] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Resources
  // ==========================================

  async function loadResources() {
    try {
      setLoading(true);
      setError("");

      const data = await getResources();

      setResources(data || []);
    } catch (error) {
      console.error("Failed to load resources:", error);

      setError(
        error.response?.data?.message || "Failed to load saved resources.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResources();
  }, []);

  // ==========================================
  // Handle Input
  // ==========================================

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ==========================================
  // Create Resource
  // ==========================================

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const title = formData.title.trim();
    const url = formData.url.trim();

    if (!title || !url) {
      setError("Please enter both title and URL.");
      return;
    }

    try {
      setSubmitting(true);

      const resource = await createResource({
        title,
        url,
      });

      setResources((prev) => [resource, ...prev]);

      setFormData({
        title: "",
        url: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Failed to create resource:", error);

      setError(error.response?.data?.message || "Failed to save resource.");
    } finally {
      setSubmitting(false);
    }
  }

  // ==========================================
  // Delete Resource
  // ==========================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteResource(id);

      setResources((prev) => prev.filter((resource) => resource._id !== id));
    } catch (error) {
      console.error("Failed to delete resource:", error);

      setError(error.response?.data?.message || "Failed to delete resource.");
    }
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
      {/* ======================================
          Header
      ====================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Bookmark size={21} className="shrink-0 text-indigo-600" />

            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Saved Resources
            </h2>
          </div>

          <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
            Save useful websites, documentation, tutorials and other resources
            for later.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((prev) => !prev);
            setError("");
          }}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] sm:w-auto"
        >
          {showForm ? (
            <>
              <X size={18} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Resource
            </>
          )}
        </button>
      </div>

      {/* ======================================
          Error
      ====================================== */}

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm leading-5 text-red-600 sm:px-4">
          {error}
        </div>
      )}

      {/* ======================================
          Add Resource Form
      ====================================== */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5"
        >
          <div className="grid gap-4">
            {/* Title */}

            <div className="min-w-0">
              <label
                htmlFor="resource-title"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="resource-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. React Documentation"
                disabled={submitting}
                autoComplete="off"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100 sm:px-4"
              />
            </div>

            {/* URL */}

            <div className="min-w-0">
              <label
                htmlFor="resource-url"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Website URL
              </label>

              <input
                id="resource-url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com"
                disabled={submitting}
                autoComplete="url"
                inputMode="url"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100 sm:px-4"
              />
            </div>

            {/* Submit */}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Save Resource
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================
          Loading
      ====================================== */}

      {loading ? (
        <div className="flex min-h-[180px] items-center justify-center">
          <Loader2 size={28} className="animate-spin text-indigo-600" />
        </div>
      ) : resources.length === 0 ? (
        /* ====================================
           Empty State
        ==================================== */

        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center sm:px-6">
          <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100">
            <LinkIcon size={22} className="text-indigo-600" />
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            No saved resources
          </h3>

          <p className="mt-1 max-w-md text-sm leading-5 text-gray-500">
            Save useful websites, tutorials, documentation, articles or tools
            that you want to access later.
          </p>

          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setError("");
            }}
            className="mt-4 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            + Save your first resource
          </button>
        </div>
      ) : (
        /* ====================================
           Resource List
        ==================================== */

        <div className="grid gap-3">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="group flex w-full min-w-0 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3.5 transition hover:border-indigo-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4"
            >
              {/* ==================================
                  Resource Info
              ================================== */}

              <div className="flex min-w-0 flex-1 items-start gap-3">
                {/* Icon */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <LinkIcon size={19} className="text-indigo-600" />
                </div>

                {/* Text */}

                <div className="min-w-0 flex-1">
                  <h3
                    className="break-words text-sm font-medium text-gray-900 sm:text-base"
                    title={resource.title}
                  >
                    {resource.title}
                  </h3>

                  <p
                    className="mt-0.5 break-all text-xs leading-5 text-gray-500"
                    title={resource.url}
                  >
                    {resource.url}
                  </p>
                </div>
              </div>

              {/* ==================================
                  Actions
              ================================== */}

              <div className="flex w-full shrink-0 items-center gap-2 border-t border-gray-100 pt-2 sm:w-auto sm:border-0 sm:pt-0">
                {/* Open */}

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open resource"
                  aria-label={`Open ${resource.title}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:flex-none sm:border-0 sm:p-2"
                >
                  <ExternalLink size={17} />

                  <span className="sm:hidden">Open</span>
                </a>

                {/* Delete */}

                <button
                  type="button"
                  onClick={() => handleDelete(resource._id)}
                  title="Delete resource"
                  aria-label={`Delete ${resource.title}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:flex-none sm:border-0 sm:p-2"
                >
                  <Trash2 size={17} />

                  <span className="sm:hidden">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedResources;
