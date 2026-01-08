interface ProductCardProps {
  product: {
    id: number;
    attributes: {
      name: string;
      description?: string;
      price: number;
      imagen?: {
        data?: Array<{
          id: number;
          attributes: { url: string };
        }>;
      };
    };
  };
  strapiUrl: string;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({
  product,
  strapiUrl,
  onAddToCart,
}: ProductCardProps) {
  const imgUrl = product.attributes.imagen?.data?.[0]?.attributes?.url;
  const imgSrc = imgUrl
    ? imgUrl.startsWith("http")
      ? imgUrl
      : `${strapiUrl}${imgUrl}`
    : "";

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 flex flex-col hover:border-gray-400 transition">
      {imgSrc && (
        <img
          src={imgSrc}
          alt={product.attributes.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}
      <h3 className="font-bold text-xl mb-2">{product.attributes.name}</h3>
      <p className="text-gray-600 mb-3 flex-grow">
        {product.attributes.description || "Sin descripción"}
      </p>
      <p className="font-bold text-lg mb-4">${product.attributes.price.toFixed(2)}</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold"
        onClick={() => onAddToCart(product.id)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
