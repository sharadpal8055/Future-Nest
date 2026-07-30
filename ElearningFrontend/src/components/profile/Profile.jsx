import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Edit3,
  KeyRound,
  Trash2,
} from "lucide-react";

import { getProfile } from "../../services/user.service";

import AvatarCard from "../../components/profile/AvatarCard";
import ProfileDetails from "../../components/profile/ProfileDetails";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import DeleteAccountModal from "../../components/profile/DeleteAccountModal";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  async function loadProfile() {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
    <div className="mx-auto max-w-7xl px-4 pt-8">
  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
          <Edit3 className="h-8 w-8 text-indigo-600" />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-600">
            Account
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 max-w-xl text-slate-500">
            View and manage your personal information, update your profile,
            and keep your account secure.
          </p>
        </div>

      </div>

      <button
        onClick={() => setOpenEdit(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg"
      >
        <Edit3 size={18} />
        Edit Profile
      </button>

    </div>
  </div>
</div>
      <div className="mx-auto max-w-7xl px-4 py-8">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:sticky lg:top-24">

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <AvatarCard
                user={user}
                onUploaded={loadProfile}
              />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-lg font-semibold">
                Account Settings
              </h2>

              <div className="space-y-3">

                <button
                  onClick={() =>
                    setOpenPassword(true)
                  }
                  className="flex w-full items-center gap-3 rounded-xl border p-4 transition hover:border-indigo-500 hover:bg-indigo-50"
                >
                  <KeyRound
                    size={20}
                    className="text-indigo-600"
                  />

                  <div className="text-left">
                    <p className="font-medium">
                      Change Password
                    </p>

                    <p className="text-sm text-gray-500">
                      Update your login password
                    </p>
                  </div>
                </button>

                <button
                  onClick={() =>
                    setOpenDelete(true)
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-red-200 p-4 transition hover:bg-red-50"
                >
                  <Trash2
                    size={20}
                    className="text-red-600"
                  />

                  <div className="text-left">
                    <p className="font-medium text-red-600">
                      Delete Account
                    </p>

                    <p className="text-sm text-gray-500">
                      Permanently remove account
                    </p>
                  </div>
                </button>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="lg:col-span-2">

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-gray-500">
                    Keep your profile updated.
                  </p>
                </div>

              </div>

              <ProfileDetails user={user} />

            </div>

          </div>

        </div>

      </div>

      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
        onUpdated={loadProfile}
      />

      <ChangePasswordModal
        open={openPassword}
        onClose={() => setOpenPassword(false)}
      />

      <DeleteAccountModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      />

    </div>
  );
}