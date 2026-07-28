import { useState } from "react";
import toast from "react-hot-toast";
import { deleteAccount } from "../../services/user.service";
import { useAuth } from "../../auth/useAuth";

export default function DeleteAccountModal({ open, onClose }) {
  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteAccount();

      toast.success("Account deleted");

      await logout();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>

        <p className="mt-3 text-gray-600">This action cannot be undone.</p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
