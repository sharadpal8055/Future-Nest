import { UserCircle, Camera } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { uploadAvatar } from "../../services/user.service";

export default function AvatarCard({ user, onUploaded }) {
  const fileRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = () => {
    fileRef.current.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.type)) {
      return toast.error("Only JPG, PNG and WEBP images are allowed.");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Maximum image size is 5 MB.");
    }

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      await uploadAvatar(formData);

      toast.success("Avatar updated successfully");

      onUploaded();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <div className="relative cursor-pointer group" onClick={handleSelect}>
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
          />
        ) : user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
          />
        ) : (
          <UserCircle className="w-32 h-32 text-gray-400" />
        )}

        <div
          className="absolute inset-0 rounded-full bg-black/40
          opacity-0 group-hover:opacity-100
          flex justify-center items-center transition"
        >
          <Camera className="text-white" />
        </div>
      </div>

      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFile}
      />

      <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>

      <p className="text-gray-500">{user?.role}</p>

      {loading && <p className="text-indigo-600 mt-3">Uploading...</p>}
    </div>
  );
}
