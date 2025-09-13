import { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botón redondo con inicial o ícono */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md hover:shadow-lg transition"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Diego Narrea</p>
            <p className="text-xs text-gray-500">diego@email.com</p>
          </div>
          <div className="border-t border-gray-100">
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
