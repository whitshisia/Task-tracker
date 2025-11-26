import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="mt-4 bg-white p-4 rounded shadow max-w-sm">
        <div className="mb-2">
          <span className="font-medium">Username:</span> {user.username}
        </div>

        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
