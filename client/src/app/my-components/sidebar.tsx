import React from "react";
import {
  House,
  CircleHelp,
  CircleAlert,
  Minus,
  Share2,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="p-4 border-r bg-gray-900 text-gray-300 w-[60px] flex flex-col justify-between items-center min-h-screen">
      {/* Top Section Icons */}
      <div className="flex flex-col gap-5">
        <House className="text-green-400 hover:text-green-500 transition-all duration-200 w-6 h-6" />
        <Minus className="text-gray-500 hover:text-gray-400 transition-all duration-200 w-6 h-6" />
        <CircleHelp className="text-blue-400 hover:text-blue-500 transition-all duration-200 w-6 h-6" />
        <CircleAlert className="text-red-400 hover:text-red-500 transition-all duration-200 w-6 h-6" />
        <Share2 className="text-yellow-400 hover:text-yellow-500 transition-all duration-200 w-6 h-6" />
      </div>

      {/* Bottom Section Icon */}
      <div className="flex justify-center">
        <Settings className="text-gray-400 hover:text-gray-300 transition-all duration-200 w-6 h-6" />
      </div>
    </aside>
  );
}
