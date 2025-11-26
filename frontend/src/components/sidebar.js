import { NavLink } from "react-router-dom";
import { Home, ListTodo, BarChart3, Settings } from "lucide-react";

const menu = [
  { label: "Dashboard", path: "/", icon: <Home size={18} /> },
  { label: "Tasks", path: "/tasks", icon: <ListTodo size={18} /> },
  { label: "Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={18} /> },

];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:block">
      <h1 className="text-xl font-semibold mb-6 text-sky-600">
        Smart Task Tracker
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                ${isActive ? "bg-sky-500 text-white" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
