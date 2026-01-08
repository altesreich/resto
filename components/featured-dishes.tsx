import Image from "next/image"

type Dish = {
  id: string
  name: string
  description: string
  image: string
}

async function getFeaturedItems(): Promise<Dish[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/item-menus?sort=createdAt:desc&pagination[limit]=3&populate=imagen`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) return []

  const json = await res.json()

  return json.data.map((item: any) => {
    const attrs = item.attributes || {}

    // imagen es Multiple Media; puede venir undefined o sin data
    const imagesArray = Array.isArray(attrs.imagen?.data)
      ? attrs.imagen.data
      : []

    const firstImageAttr = imagesArray[0]?.attributes
    const imageUrl = firstImageAttr?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstImageAttr.url}`
      : "/placeholder.svg"

    return {
      id: item.documentId || item.id,
      name: attrs.name ?? "Sin nombre",
      description: attrs.decription ?? "",
      image: imageUrl,
    }
  })
}

export default async function FeaturedDishes() {
  const dishes = await getFeaturedItems()

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-10 w-72 h-72 bg-gray-300/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 left-0 w-80 h-80 bg-gray-200/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-700 font-lora text-xs md:text-sm uppercase tracking-[0.25em] mb-3">
            Nuestros Favoritos
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Platos Destacados
          </h2>
          <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-full mb-5" />
          <p className="text-gray-600 font-lora max-w-2xl mx-auto text-sm md:text-base">
            Selección de nuestros platos más icónicos preparados con ingredientes premium.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {dishes.map((dish) => (
            <article
              key={dish.id}
              className="group relative cursor-pointer rounded-2xl bg-white/90 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative h-72">
                <Image
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 350px, (min-width: 768px) 33vw, 100vw"
                />

                {/* Overlay degradado + etiqueta */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-900 shadow-sm">
                    Signature Dish
                  </span>
                </div>

                {/* Nombre sobre imagen en hover */}
                <div className="absolute inset-x-0 bottom-4 px-5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="font-playfair text-2xl text-white drop-shadow-lg">
                    {dish.name}
                  </h3>
                </div>
              </div>

              {/* Texto */}
              <div className="px-5 pt-5 pb-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-gray-600 font-lora text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Línea glow inferior */}
              <span className="pointer-events-none absolute inset-x-10 bottom-0 h-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
