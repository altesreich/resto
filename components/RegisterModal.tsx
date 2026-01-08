"use client"

import type React from "react"
import { useState } from "react"
import { X, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false, // ⭐ RGPD obligatorio en España
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  if (!isOpen) return null

  // Validaciones
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidSpanishPhone = (phone: string): boolean => {
    // Formatos españoles: +34 123 456 789, 612345678, (+34) 612 34 56 78
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    return /^(\+34|0034)?[6789]\d{8}$/.test(cleanPhone)
  }

  const isStrongPassword = (password: string): boolean => {
    // Al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validación RGPD
    if (!formData.acceptTerms) {
      setError("Debes aceptar la Política de Privacidad para continuar")
      return
    }

    // Validación username
    if (formData.username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres")
      return
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(formData.username)) {
      setError("El nombre de usuario solo puede contener letras, números, guiones y puntos")
      return
    }

    // Validación email
    if (!isValidEmail(formData.email)) {
      setError("Por favor, introduce un email válido")
      return
    }

    // Validación teléfono (si se proporciona)
    if (formData.phone && !isValidSpanishPhone(formData.phone)) {
      setError("Por favor, introduce un número de teléfono español válido (ej: 612345678)")
      return
    }

    // Validación contraseña
    if (!isStrongPassword(formData.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

      if (!strapiUrl) {
        throw new Error("Error de configuración: URL del backend no encontrada")
      }

      // ⭐ IMPORTANTE: Strapi NO acepta 'phone' por defecto
      // Primero registramos el usuario
      const registerResponse = await fetch(`${strapiUrl}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      })

      const registerData = await registerResponse.json()

      if (!registerResponse.ok) {
        // Mensajes de error personalizados en español
        if (registerData.error?.message?.includes("Email already taken")) {
          throw new Error("Este email ya está registrado")
        } else if (registerData.error?.message?.includes("Username already taken")) {
          throw new Error("Este nombre de usuario ya está en uso")
        } else {
          throw new Error(registerData.error?.message || "Error al registrar usuario")
        }
      }

      // Si hay teléfono, lo guardamos después
      if (formData.phone && registerData.jwt) {
        try {
          await fetch(`${strapiUrl}/api/users/${registerData.user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${registerData.jwt}`,
            },
            body: JSON.stringify({
              phone: formData.phone,
            }),
          })
        } catch (phoneError) {
          console.warn("No se pudo guardar el teléfono:", phoneError)
          // No mostramos error al usuario, el registro fue exitoso
        }
      }

      setSuccess("¡Registro exitoso! Redirigiendo...")
      
      // Limpiar formulario
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      })

      // Guardar token y usuario
      localStorage.setItem("token", registerData.jwt)
      localStorage.setItem("user", JSON.stringify(registerData.user))

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        onClose()
        setSuccess("")
        window.location.href = "/perfil" // O usar router.push('/perfil')
      }, 1500)

    } catch (err) {
      console.error("Error de registro:", err)
      setError(err instanceof Error ? err.message : "Error al registrar usuario. Por favor, inténtalo de nuevo")
      setSuccess("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-lg z-10">
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Crear Cuenta</h2>
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
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm font-lora">
              {success}
            </div>
          )}

          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="flex items-center gap-2 text-sm font-lora font-semibold text-gray-700">
              <User className="w-4 h-4" />
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              required
              autoComplete="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().trim() })}
              placeholder="tu_nombre_usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 font-lora">Mínimo 3 caracteres. Solo letras, números y guiones</p>
          </div>

          {/* Email */}
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

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-lora font-semibold text-gray-700">
              <Phone className="w-4 h-4" />
              Teléfono <span className="text-gray-500 font-normal">(opcional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="612 34 56 78"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 font-lora">Formato: 612345678 o +34 612 34 56 78</p>
          </div>

          {/* Password */}
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
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mínimo 8 caracteres"
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
            <p className="text-xs text-gray-500 font-lora">Incluye mayúsculas, minúsculas y números</p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-lora font-semibold text-gray-700">
              <Lock className="w-4 h-4" />
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 font-lora text-gray-900 pr-10"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* RGPD Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              id="acceptTerms"
              type="checkbox"
              required
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-gray-900"
              disabled={loading}
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-600 font-lora">
              Acepto la{" "}
              <a href="/politica-privacidad" target="_blank" className="text-gray-900 font-semibold hover:underline">
                Política de Privacidad
              </a>{" "}
              y los{" "}
              <a href="/terminos" target="_blank" className="text-gray-900 font-semibold hover:underline">
                Términos y Condiciones
              </a>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className="w-full bg-gray-900 text-white py-3 rounded-md font-lora font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? "Registrando..." : "Crear Cuenta"}
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
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                disabled={loading}
                className="text-gray-900 font-semibold hover:underline disabled:opacity-50"
              >
                Inicia sesión aquí
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
