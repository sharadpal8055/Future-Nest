import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "../../services/user.service";

export default function EditProfileModal({
  open,
  onClose,
  user,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        location: user.location || "",
        website: user.website || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
      });
    }
  }, [user]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      await updateProfile(form);

      toast.success("Profile updated successfully");

      onUpdated();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            Edit Profile
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 grid md:grid-cols-2 gap-4"
        >

          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <Input
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />

          <Input
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />

          <Input
            label="GitHub"
            name="github"
            value={form.github}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">
              Bio
            </label>

          <textarea
  rows={4}
  name="bio"
  maxLength={300}
  value={form.bio}
  onChange={handleChange}
  className="w-full border rounded-lg mt-1 p-3"
/>

<div className="mt-1 flex justify-between text-sm text-gray-500">
  <span>Maximum 300 characters</span>
  <span>{form.bio.length}/300</span>
</div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-lg p-3"
      />
    </div>
  );
}