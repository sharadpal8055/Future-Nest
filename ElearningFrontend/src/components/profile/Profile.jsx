import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getProfile } from "../../services/user.service";

import AvatarCard from "../../components/profile/AvatarCard";
import ProfileDetails from "../../components/profile/ProfileDetails";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import DeleteAccountModal from "../../components/profile/DeleteAccountModal";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPassword, setOpenPassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  async function loadProfile() {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>

          <button
            onClick={() => setOpenEdit(true)}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => setOpenPassword(true)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Change Password
          </button>

          <button
            onClick={() => setOpenDelete(true)}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <AvatarCard user={user} onUploaded={loadProfile} />

          <div className="lg:col-span-2">
            <ProfileDetails user={user} />
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
