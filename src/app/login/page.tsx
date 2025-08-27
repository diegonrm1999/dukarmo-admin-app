"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simula login
      console.log("Logged in");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Fondo */}
      <Image
        src="/images/background.jpg"
        alt="Login Background"
        fill
        className="object-cover opacity-40 z-0"
        priority
      />

      <div className="absolute z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-2xl backdrop-blur-md">
        {" "}
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 px-0 pb-2 border-0 border-b border-gray-400 focus:border-black focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full mt-1 px-0 pb-2 border-0 border-b border-gray-400 focus:border-black focus:outline-none focus:ring-0"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full mt-4 py-2 px-4 text-white font-semibold transition",
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-neutral-800"
            )}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
