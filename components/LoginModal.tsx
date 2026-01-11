"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, Lock } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Aquí integrarás con tu backend/Strapi
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al iniciar sesión")
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.jwt)
      localStorage.setItem("user", JSON.stringify(data.user))
      
      alert("¡Bienvenido de nuevo!")
      onClose()
      window.location.reload() // O usa tu sistema de estado global
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-lg">
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Iniciar Sesión</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Cerrar"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm font-lora">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-lora font-semibold text-gray-700">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-lora font-semibold text-gray-700">
              <Lock className="w-4 h-4" />
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900"
            />
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-md font-lora font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-transparent border-2 border-gray-900 text-gray-900 py-3 rounded-md font-lora font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Cancelar
            </button>
            
            <div className="text-center text-sm font-lora text-gray-600 pt-2">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-gray-900 font-semibold hover:underline"
              >
                Regístrate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
