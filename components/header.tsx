"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { LoginModal } from "./LoginModal"
import { RegisterModal } from "./RegisterModal"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contactenos", label: "Contáctenos" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white font-playfair font-bold text-xl">L</span>
              </div>
              <span className="font-playfair text-2xl font-bold text-gray-900 hidden sm:inline">Luxe</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-lora text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="bg-transparent border-2 border-gray-900 text-gray-900 px-4 py-2 rounded font-lora text-sm font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Registrarse
              </button>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-gray-900 border-2 border-gray-900 text-white px-4 py-2 rounded font-lora text-sm font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden" 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-300">
              <div className="flex flex-col gap-4 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-lora text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    setShowRegisterModal(true)
                    setIsOpen(false)
                  }}
                  className="bg-transparent border-2 border-gray-900 text-gray-900 px-4 py-2 rounded font-lora text-sm font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 text-center"
                >
                  Registrarse
                </button>
                <button 
                  onClick={() => {
                    setShowLoginModal(true)
                    setIsOpen(false)
                  }}
                  className="bg-gray-900 border-2 border-gray-900 text-white px-4 py-2 rounded font-lora text-sm font-semibold hover:bg-gray-800 transition-all duration-300 text-center"
                >
                  Login
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Modales */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false)
          setShowRegisterModal(true)
        }}
      />
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false)
          setShowLoginModal(true)
        }}
      />
    </>
  )
}
