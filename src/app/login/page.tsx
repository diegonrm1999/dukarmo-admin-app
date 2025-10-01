"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import api from "@/app/api";
import { useAuth } from "@/context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  message: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {/* Mostrar error si existe */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="w-full mt-1 px-0 pb-2 border-0 border-b border-gray-400 focus:border-black focus:outline-none focus:ring-0 disabled:opacity-50"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="w-full mt-1 px-0 pb-2 border-0 border-b border-gray-400 focus:border-black focus:outline-none focus:ring-0 disabled:opacity-50"
              placeholder="Tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.email || !formData.password}
            className={cn(
              "w-full mt-6 py-3 px-4 text-white font-semibold rounded-md transition-colors",
              loading || !formData.email || !formData.password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-neutral-800 focus:ring-2 focus:ring-black focus:ring-offset-2"
            )}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
