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

      const resources = await getResources();

      setResources(resources || []);
    } catch (error) {
      console.error("Failed to load resources:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load saved resources."
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

      // Reset form
      setFormData({
        title: "",
        url: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Failed to create resource:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save resource."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ==========================================
  // Delete Resource
  // ==========================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteResource(id);

      setResources((prev) =>
        prev.filter((resource) => resource._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete resource:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete resource."
      );
    }
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark
              size={22}
              className="text-indigo-600"
            />

            <h2 className="text-xl font-semibold text-gray-900">
              Saved Resources
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Save useful websites, documentation, tutorials and
            other resources for later.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((prev) => !prev);
            setError("");
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
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

      {/* Error */}

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Add Resource Form */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5"
        >
          <div className="grid gap-4">

            {/* Title */}

            <div>
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
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* URL */}

            <div>
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
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Submit */}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
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

      {/* Loading */}

      {loading ? (
        <div className="flex min-h-[180px] items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-indigo-600"
          />
        </div>
      ) : resources.length === 0 ? (

        /* Empty State */

        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <LinkIcon
              size={22}
              className="text-indigo-600"
            />
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            No saved resources
          </h3>

          <p className="mt-1 max-w-md text-sm text-gray-500">
            Save useful websites, tutorials, documentation,
            articles or tools that you want to access later.
          </p>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            + Save your first resource
          </button>
        </div>
      ) : (

        /* Resource List */

        <div className="grid gap-3">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm"
            >
              {/* Resource Info */}

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <LinkIcon
                    size={19}
                    className="text-indigo-600"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-medium text-gray-900">
                    {resource.title}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {resource.url}
                  </p>
                </div>
              </div>

              {/* Actions */}

              <div className="flex shrink-0 items-center gap-1">

                {/* Open */}

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open resource"
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <ExternalLink size={18} />
                </a>

                {/* Delete */}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(resource._id)
                  }
                  title="Delete resource"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={18} />
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