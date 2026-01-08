"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)

  if (!isOpen) return null

  // Validación de email español
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones previas
    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos")
      return
    }

    if (!isValidEmail(formData.email)) {
      setError("Por favor, introduce un email válido")
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

      if (!strapiUrl) {
        throw new Error("Error de configuración: URL del backend no encontrada")
      }

      const response = await fetch(`${strapiUrl}/api/auth/local`, {
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
        // Mensajes de error personalizados en español
        if (response.status === 400) {
          throw new Error("Email o contraseña incorrectos")
        } else if (response.status === 429) {
          throw new Error("Demasiados intentos. Por favor, espera unos minutos")
        } else {
          throw new Error(data.error?.message || "Error al iniciar sesión. Inténtalo de nuevo")
        }
      }

      // Verificar que recibimos los datos necesarios
      if (!data.jwt || !data.user) {
        throw new Error("Respuesta del servidor inválida")
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.jwt)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Opcional: Cookie para RGPD
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 30) // 30 días
      document.cookie = `auth_token=${data.jwt}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`

      // Limpiar formulario
      setFormData({ email: "", password: "" })
      
      // Cerrar modal
      onClose()

      // Recargar o redirigir
      window.location.href = "/perfil" // O usa tu router: router.push('/perfil')
      
    } catch (err) {
      console.error("Error de login:", err)
      setError(err instanceof Error ? err.message : "Error al iniciar sesión. Por favor, inténtalo de nuevo")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // Implementar recuperación de contraseña
    alert("Funcionalidad de recuperación de contraseña próximamente")
    // O redirigir: window.location.href = "/recuperar-contrasena"
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
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase().trim() })}
              placeholder="tu@correo.es"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center gap-2 text-sm font-lora font-semibold text-gray-700">
              <Lock className="w-4 h-4" />
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Tu contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900 pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-gray-600 hover:text-gray-900 font-lora hover:underline"
            >
              ¿Has olvidado tu contraseña?
            </button>
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-md font-lora font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full bg-transparent border-2 border-gray-900 text-gray-900 py-3 rounded-md font-lora font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              Cancelar
            </button>

            <div className="text-center text-sm font-lora text-gray-600 pt-2">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                disabled={loading}
                className="text-gray-900 font-semibold hover:underline disabled:opacity-50"
              >
                Regístrate aquí
              </button>
            </div>
          </div>

          {/* RGPD Notice */}
          <p className="text-xs text-gray-500 text-center font-lora pt-2">
            Al iniciar sesión, aceptas nuestra{" "}
            <a href="/politica-privacidad" className="underline hover:text-gray-900">
              Política de Privacidad
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
