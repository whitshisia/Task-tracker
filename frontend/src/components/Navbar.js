import { Bell, Wifi } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      
      <div className="hidden md:flex items-center gap-2 text-gray-500">
        {/* Breadcrumb or dynamic page title */}
        <span className="font-semibold text-gray-700 text-lg">Overview</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Online indicator */}
        <div className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
          <Wifi size={16} />
          Online
        </div>

        {/* Notification icon */}
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User avatar */}
        <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
}
