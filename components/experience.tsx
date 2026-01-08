import { Wine, Flame, Users } from "lucide-react"

const experiences = [
  {
    icon: Wine,
    title: "Cócteles Artesanales",
    description: "Bebidas creadas por maestros mixólogos con ingredientes premium seleccionados",
  },
  {
    icon: Flame,
    title: "Cocina de Fuego",
    description: "Técnicas de cocción tradicionales que realzan el sabor natural de cada ingrediente",
  },
  {
    icon: Users,
    title: "Ambiente Sofisticado",
    description: "Espacio diseñado para crear momentos memorables con tus seres queridos",
  },
]

export default function Experience() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-100 via-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-300/30 via-transparent to-transparent w-96 h-96 rounded-full blur-3xl absolute top-[-100px] right-[-100px]" />
        <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gray-200/25 via-transparent to-transparent w-80 h-80 rounded-full blur-2xl absolute bottom-[-80px] left-[-80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide drop-shadow-lg">Una Experiencia Única</h2>
          <div className="w-24 mx-auto h-1 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon
            return (
              <div
                key={idx}
                className="group relative text-center p-8 rounded-2xl border border-gray-300 shadow-lg hover:shadow-2xl bg-white transition-all duration-300 hover:scale-105"
                style={{ minHeight: 320 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-3">{exp.title}</h3>
                <p className="text-gray-700 font-lora leading-relaxed mb-4">{exp.description}</p>
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
