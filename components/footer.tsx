import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-playfair font-bold">L</span>
              </div>
              <span className="font-playfair text-lg font-bold text-white">Luxe</span>
            </div>
            <p className="text-gray-400 text-sm font-lora">
              Experiencia gastronómica premium con cócteles artesanales.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-white">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Servicios
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-white">Horarios</h3>
            <ul className="space-y-2 text-gray-400 text-sm font-lora">
              <li>Lunes - Jueves: 5 PM - 12 AM</li>
              <li>Viernes - Sábado: 5 PM - 2 AM</li>
              <li>Domingo: 6 PM - 11 PM</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400 text-sm font-lora">+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400 text-sm font-lora">info@luxe.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400 text-sm font-lora">Cra 7 #100, Bogotá</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm font-lora">
            © 2025 Luxe Bar & Restaurante. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
