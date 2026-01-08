"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function Nosotros() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-96 bg-white flex items-center justify-center border-b border-gray-200">
        <div className="relative z-10 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900">Nuestra Historia</h1>
          <p className="text-xl text-gray-600 mt-4 font-lora">Tradición, pasión y excelencia desde 2010</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div
              className={`relative h-96 rounded-lg overflow-hidden border border-gray-200 shadow-lg transition-all duration-1000 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Image
                src="/luxe-bar-interior-elegant.jpg"
                alt="Luxe Bar Interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text */}
            <div
              className={`transition-all duration-1000 transform ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <p className="text-gray-600 font-lora text-sm uppercase tracking-widest mb-2">Sobre Nosotros</p>
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">Lujo y Excelencia</h2>
              <p className="text-gray-700 font-lora mb-4 leading-relaxed">
                Desde 2010, Luxe Bar & Restaurante ha sido el destino preferido de quienes buscan una experiencia
                gastronómica de clase mundial. Ubicado en el corazón de la ciudad, nuestro establecimiento combina la
                elegancia clásica con la modernidad contemporánea.
              </p>
              <p className="text-gray-700 font-lora mb-4 leading-relaxed">
                Nuestro equipo de chefs premiados y maestros mixólogos trabaja incansablemente para ofrecer lo mejor de
                la gastronomía internacional, reinterpretada con ingredientes locales de la más alta calidad.
              </p>
              <p className="text-gray-700 font-lora leading-relaxed">
                Creemos que cada visita debe ser memorable, por eso nos esforzamos cada día en superar las expectativas
                de nuestros clientes.
              </p>
            </div>
          </div>

          {/* Stats - Added staggered animation effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-gray-200">
            {[
              { number: "14+", label: "Años de Experiencia" },
              { number: "5K+", label: "Clientes Felices" },
              { number: "50+", label: "Platos en Menú" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center transition-all duration-700 hover:scale-110"
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <div className="font-playfair text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-gray-600 font-lora">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Updated with white background and hover effects */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-600 font-lora text-sm uppercase tracking-widest mb-2">Nuestro Equipo</p>
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Maestros del Oficio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Carlos Martínez", role: "Chef Ejecutivo", image: "/professional-chef.jpg" },
              { name: "Laura González", role: "Sommelier Jefa", image: "/sommelier-wine-expert.jpg" },
              { name: "José Rodríguez", role: "Maestro Mixólogo", image: "/bartender-mixing-cocktails.jpg" },
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 font-lora text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
