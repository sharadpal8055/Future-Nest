export default function ProfileDetails({ user }) {
  console.log(user)
  const Item = ({ label, value }) => (
    <div className="border-b py-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">
        Profile Information
      </h2>

      <div className="grid md:grid-cols-2 gap-x-8">
        <Item label="Name" value={user?.name} />
        <Item label="Email" value={user?.email} />
        <Item label="Role" value={user?.role} />
        <Item label="Bio" value={user?.bio} />
        <Item label="Phone" value={user?.phone} />
        <Item label="Location" value={user?.location} />
        <Item label="Website" value={user?.website} />
        <Item label="LinkedIn" value={user?.linkedin} />
        <Item label="GitHub" value={user?.github} />
        <Item
          label="Last Login"
          value={
            user?.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "-"
          }
        />
      </div>
    </div>
  );
}