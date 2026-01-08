"use client"

import { Sparkles, Wine, Music, Users } from "lucide-react"

const welcomeItems = [
  {
    icon: Wine,
    title: "Cócteles Premium",
    description: "Bebidas artesanales creadas por maestros mixólogos con ingredientes seleccionados internacionalmente",
  },
  {
    icon: Music,
    title: "Ambiente Elegante",
    description: "Un espacio sofisticado diseñado para crear momentos memorables con decoración de lujo y comodidad",
  },
  {
    icon: Users,
    title: "Experiencias Exclusivas",
    description: "Eventos privados y reservas VIP para disfrutar de una noche inolvidable con tus seres queridos",
  },
  {
    icon: Sparkles,
    title: "Gastronomía de Autor",
    description: "Platos exquisitos preparados con técnicas culinarias premium y ingredientes de la más alta calidad",
  },
]

export default function WelcomeBanner() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Efecto de luz de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-700/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-800/25 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de bienvenida */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-700/40 border border-gray-600/50 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-gray-300" />
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-200 font-medium">Bienvenido</span>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            Bienvenido a <span className="bg-gradient-to-r from-gray-300 to-gray-200 bg-clip-text text-transparent">Lux Ben</span>
          </h1>

          <p className="font-lora text-base md:text-lg text-gray-200/80 max-w-2xl mx-auto">
            Descubre la perfección en cada detalle de nuestra experiencia premium
          </p>
        </div>

        {/* Grid de 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {welcomeItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:border-gray-600/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(55,65,81,0.4)]"
              >
                {/* Icono */}
                <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Título */}
                <h3 className="font-playfair text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Descripción */}
                <p className="font-lora text-sm md:text-base text-gray-200/70 leading-relaxed">
                  {item.description}
                </p>

                {/* Línea decorativa inferior en hover */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full group-hover:w-2/3 transition-all duration-300" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
