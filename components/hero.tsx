"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDE_INTERVAL = 6000

const sliderImages = [
  {
    title: "Cócteles artesanales",
    description: "Bebidas de autor creadas por maestros mixólogos.",
    image: "/elegant-cocktails-bar.jpg",
    ctas: [
      { label: "Carta de cócteles", target: "services" },
      { label: "Ver mixología", target: "services" },
    ],
  },
  {
    title: "Gastronomía de autor",
    description: "Platos exquisitos con ingredientes seleccionados.",
    image: "/gourmet-restaurant-dishes.jpg",
    ctas: [
      { label: "Nuestros platos", target: "services" },
      { label: "Menú degustación", target: "services" },
    ],
  },
  {
    title: "Ambiente sofisticado",
    description: "Un espacio diseñado para experiencias inolvidables.",
    image: "/luxury-bar-interior-dark.jpg",
    ctas: [
      { label: "Eventos privados", target: "services" },
      { label: "Reservar mesa", target: "reservation" },
    ],
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((current + 1) % sliderImages.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [current])

  const goToSlide = (index: number) => {
    setCurrent(index)
    setFadeKey((k) => k + 1)
  }

  const prev = () => {
    goToSlide((current - 1 + sliderImages.length) % sliderImages.length)
  }

  const next = () => {
    goToSlide((current + 1) % sliderImages.length)
  }

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const slide = sliderImages[current]

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-700"
        style={{ backgroundImage: `url('${slide.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/20" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-16">
          <div
            key={fadeKey}
            className="animate-[fadeUp_0.6s_ease-out] space-y-6"
          >
            <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-gray-200 backdrop-blur">
              Experiencia gastro & coctelería
            </p>

            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight hover:text-blue-300/90 transition-colors">
              {slide.title}
            </h1>

            <p className="max-w-xl font-lora text-base md:text-xl text-gray-100/90 leading-relaxed">
              {slide.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {slide.ctas?.[0] && (
                <button
                  className="btn-primary font-lora transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  onClick={() => scrollToSection(slide.ctas[0].target)}
                >
                  {slide.ctas[0].label}
                </button>
              )}

              {slide.ctas?.[1] && (
                <button
                  className="btn-ghost font-lora transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  onClick={() => scrollToSection(slide.ctas[1].target)}
                >
                  {slide.ctas[1].label}
                </button>
              )}
            </div>

            <p className="pt-2 text-xs md:text-sm uppercase tracking-[0.25em] text-gray-300">
              Cocktails · Alta cocina · Música ambiente
            </p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur transition hover:bg-white hover:text-black"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur transition hover:bg-white hover:text-black"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {sliderImages.map((_, index) => {
          const isActive = index === current
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                isActive ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          )
        })}
      </div>
    </section>
  )
}
