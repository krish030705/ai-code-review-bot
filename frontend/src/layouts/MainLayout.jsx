import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6 font-medium text-gray-700">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <button onClick={logout} className="text-red-500 hover:underline">
          Log out
        </button>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
