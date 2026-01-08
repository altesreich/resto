"use client"

import { useState } from "react"

export default function BartendenVideos() {
  const [selectedVideo, setSelectedVideo] = useState(0)

  const videos = [
    {
      id: 1,
      title: "Margarita Clásica",
      description: "Técnica perfecta para preparar un margarita tradicional",
      url: "https://videos.pexels.com/video-files/5632390/5632390-sd_640_360_30fps.mp4",
      thumbnail: "/bartender-making-margarita.jpg",
    },
    {
      id: 2,
      title: "Mojito Refrescante",
      description: "El arte de preparar un mojito auténtico",
      url: "https://videos.pexels.com/video-files/5632389/5632389-sd_640_360_30fps.mp4",
      thumbnail: "/bartender-making-mojito.jpg",
    },
    {
      id: 3,
      title: "Old Fashioned",
      description: "Un cóctel clásico preparado con maestría",
      url: "https://videos.pexels.com/video-files/5632388/5632388-sd_640_360_30fps.mp4",
      thumbnail: "/bartender-making-old-fashioned.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">Maestros del Coctel</h2>
          <p className="font-lora text-gray-600 text-lg max-w-2xl mx-auto">
            Aprende de nuestros bartenders expertos mientras preparan bebidas excepcionales con técnica y creatividad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <video key={videos[selectedVideo].url} className="w-full h-96 bg-black object-cover" controls autoPlay>
                <source src={videos[selectedVideo].url} type="video/mp4" />
                Tu navegador no soporta videos HTML5
              </video>
            </div>
            <div className="mt-6">
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">{videos[selectedVideo].title}</h3>
              <p className="font-lora text-gray-600">{videos[selectedVideo].description}</p>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">Nuestros Videos</h3>
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(index)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedVideo === index
                    ? "bg-gray-900 text-white"
                    : "bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-500"
                }`}
              >
                <h4 className="font-playfair font-bold mb-1">{video.title}</h4>
                <p className="font-lora text-sm opacity-80 line-clamp-2">{video.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
