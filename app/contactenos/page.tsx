"use client"

import type React from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function Contactenos() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center border-b border-gray-200">
        <div className="relative z-10 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900">Contáctanos</h1>
          <p className="text-xl text-gray-600 mt-4 font-lora">Estamos aquí para atenderte</p>
        </div>
      </section>

      {/* Contact Info Cards - White backgrounds with gray text and interactive hover */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white rounded-lg text-center border-2 border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-700 font-lora">+57 300 123 4567</p>
              <p className="text-gray-500 font-lora text-sm">Disponible de L-D: 5 PM - 2 AM</p>
            </div>

            <div className="p-8 bg-white rounded-lg text-center border-2 border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700 font-lora">info@luxe.com</p>
              <p className="text-gray-500 font-lora text-sm">Respuesta en 24 horas</p>
            </div>

            <div className="p-8 bg-white rounded-lg text-center border-2 border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">Ubicación</h3>
              <p className="text-gray-700 font-lora">Carrera 7 #100-50</p>
              <p className="text-gray-500 font-lora text-sm">Bogotá, Colombia</p>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Form */}
            <div className="max-w-2xl">
              <div className="text-center mb-12">
                <p className="text-gray-600 font-lora text-sm uppercase tracking-widest mb-2">Escríbenos</p>
                <h2 className="font-playfair text-4xl font-bold text-gray-900">Envía tu Mensaje</h2>
              </div>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 font-lora animate-pulse">
                  ✓ Gracias por tu mensaje. Nos pondremos en contacto pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-lora font-semibold text-gray-900 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-lora focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-lora font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-lora focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-lora font-semibold text-gray-900 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-lora focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-lora font-semibold text-gray-900 mb-2">Asunto</label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-lora focus:outline-none focus:border-gray-900 transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="reserva">Hacer una Reserva</option>
                      <option value="evento">Evento o Catering</option>
                      <option value="consulta">Consulta General</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-lora font-semibold text-gray-900 mb-2">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-900 font-lora focus:outline-none focus:border-gray-900 transition-colors resize-none placeholder-gray-400"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-lora font-semibold transition-colors transform hover:scale-105 duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Map - Added interactive embedded map */}
            <div className="h-full min-h-96 rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.811693147215!2d-74.00567!3d4.710988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a4f4f4f4f4f%3A0x4f4f4f4f4f4f4f4f!2sCarrera%207%20%23100-50%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 flex items-center justify-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-gray-900" />
              Nuestros Horarios
            </h2>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
            <div className="space-y-4">
              {[
                { day: "Lunes - Jueves", hours: "5:00 PM - 12:00 AM" },
                { day: "Viernes - Sábado", hours: "5:00 PM - 2:00 AM" },
                { day: "Domingo", hours: "6:00 PM - 11:00 PM" },
                { day: "Días Festivos", hours: "Abierto - Llama para confirmar" },
              ].map((schedule, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 px-4 border-b border-gray-200 last:border-b-0 hover:bg-white rounded transition-colors duration-200"
                >
                  <span className="font-lora font-semibold text-gray-900">{schedule.day}</span>
                  <span className="text-gray-900 font-lora font-semibold">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
