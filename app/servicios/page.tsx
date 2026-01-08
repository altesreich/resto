"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingCart, Trash2, Plus, Minus, UtensilsCrossed, Wine, Cake, User, Clipboard, CreditCard, ZoomIn, X } from "lucide-react";

type Product = {
  id: number;
  documentId: string;
  name: string;
  decription?: string;
  price: number;
  imagen: any;
  section: {
    id: number;
    documentId: string;
    name: string;
  };
};

export default function Menu() {
  const [activeSection, setActiveSection] = useState("food");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Estados para el pedido
  const [selectedTable, setSelectedTable] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderComment, setOrderComment] = useState("");
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const sections = [
    { key: "food", label: "Comidas", icon: UtensilsCrossed },
    { key: "drink", label: "Bebidas", icon: Wine },
    { key: "dessert", label: "Postres", icon: Cake },
  ];

  const tables = [
    "Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5",
    "Mesa 6", "Mesa 7", "Mesa 8", "Mesa 9", "Mesa 10"
  ];

  const slides = [
    {
      video: "https://videos.pexels.com/video-files/3297379/3297379-hd_1920_1080_25fps.mp4",
      title: "Experiencia Culinaria Única",
      subtitle: "Sabores que cautivan tus sentidos"
    },
    {
      video: "https://videos.pexels.com/video-files/3298989/3298989-hd_1920_1080_30fps.mp4",
      title: "Ingredientes Frescos",
      subtitle: "Calidad en cada bocado"
    },
    {
      video: "https://videos.pexels.com/video-files/4253312/4253312-hd_1920_1080_25fps.mp4",
      title: "Tradición y Sabor",
      subtitle: "Recetas que perduran en el tiempo"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      setError(null);
      
      try {
        const url = `${STRAPI_URL}/api/item-menus?populate=*`;
        const res = await fetch(url);
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }
        
        const json = await res.json();
        setAllProducts(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Error desconocido";
        setError(errorMsg);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllProducts();
  }, [STRAPI_URL]);

  const hasBeerInCart = () => {
    return Object.keys(cart).some(productId => {
      const product = getProductById(Number(productId));
      return product?.name.toLowerCase().includes("cerveza");
    });
  };

  const filteredProducts = allProducts
    .filter((product) => product.section?.name === activeSection)
    .filter((product) =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getProductById = (id: number) => {
    return allProducts.find((p) => p.id === id);
  };

  const getImageUrl = (product: Product) => {
    if (!product.imagen) return null;
    
    if (product.imagen.url) {
      return product.imagen.url.startsWith("http") 
        ? product.imagen.url 
        : `${STRAPI_URL}${product.imagen.url}`;
    }
    
    if (Array.isArray(product.imagen) && product.imagen.length > 0) {
      const url = product.imagen[0].url;
      return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
    }
    
    return null;
  };

  const addToCart = (product: Product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    
    if (product.name.toLowerCase().includes("cerveza")) {
      if (!orderComment.includes("Tapa deseada:")) {
        setOrderComment(prev => prev + "\n\n🍺 Tapa deseada: ");
      }
    }
  };

  const incrementCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrementCart = (productId: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] <= 1) {
        delete updated[productId];
      } else {
        updated[productId]--;
      }
      return updated;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((acc, [id, quantity]) => {
      const product = getProductById(Number(id));
      return acc + (product?.price || 0) * quantity;
    }, 0);
  };

  const cartItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const sendOrderToRedesis = async () => {
    if (Object.keys(cart).length === 0) {
      alert("El carrito está vacío");
      return;
    }

    if (!selectedTable) {
      alert("Por favor, seleccione una mesa");
      return;
    }

    if (!customerName.trim()) {
      alert("Por favor, ingrese su nombre");
      return;
    }

    if (hasBeerInCart() && !orderComment.trim()) {
      alert("Si pidió cerveza, por favor indique la tapa deseada en los comentarios");
      return;
    }

    const total = calculateTotal();

    try {
      const orderPayload = {
        data: {
          table: selectedTable,
          item_menus: Object.keys(cart).map(id => Number(id)),
          amount: cart,
          total: total,
          order_status: "Pending",
          comment: `Cliente: ${customerName}\n${orderComment}`,
        },
      };

      const response = await fetch(`${STRAPI_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error(`Error al crear el pedido: ${response.status}`);
      }

      const orderData = await response.json();
      const orderId = orderData.data.id;
      
      setCart({});
      setSelectedTable("");
      setCustomerName("");
      setOrderComment("");
      setShowCart(false);
      
      window.location.href = `https://redesis.example.com/payment?orderId=${orderId}&total=${total}`;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      alert("Error al enviar el pedido: " + errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Modal de zoom de imagen */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomedImage}
            alt="Zoom"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header con video slider */}
      <header className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="relative z-20 h-full flex flex-col justify-between">
          <div className="bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-bold text-white">Restaurante Elegante</h1>
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="relative bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-semibold">Carrito</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-white px-4">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xl md:text-2xl font-light drop-shadow-lg">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          <div className="flex justify-center gap-2 pb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Secciones */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.key}
                className={`group relative overflow-hidden rounded-lg p-8 transition-all duration-300 border-2 ${
                  activeSection === section.key
                    ? "bg-gray-900 border-gray-900 shadow-xl scale-105"
                    : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-lg"
                }`}
                onClick={() => setActiveSection(section.key)}
              >
                <div className="flex flex-col items-center gap-3">
                  <Icon className={`w-12 h-12 transition-colors ${
                    activeSection === section.key ? "text-white" : "text-gray-700"
                  }`} />
                  <span className={`font-serif font-semibold text-xl ${
                    activeSection === section.key ? "text-white" : "text-gray-800"
                  }`}>
                    {section.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Buscador */}
        <div className="relative mb-12">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar en nuestro menú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white rounded-lg border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-all text-gray-800 placeholder-gray-400 shadow-sm"
          />
        </div>

        {/* Estados */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent" />
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6">
            <p className="font-bold text-lg">Error al cargar el menú</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {!loading && filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-500 text-xl font-serif">No hay productos en esta sección</p>
            </div>
          )}
          
          {filteredProducts.map((product) => {
            const imgSrc = getImageUrl(product) || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
            const inCart = cart[product.id] || 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => setZoomedImage(imgSrc)}
                  />
                  <button
                    onClick={() => setZoomedImage(imgSrc)}
                    className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  {inCart > 0 && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      {inCart}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif font-bold text-2xl mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
                    {product.decription || "Platillo elaborado con ingredientes selectos"}
                  </p>
                  
                  <div className="flex justify-between items-center gap-3">
                    <div className="text-3xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                    
                    {/* Mostrar contador si está en el carrito, sino botón agregar */}
                    {inCart > 0 ? (
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <button
                          onClick={() => decrementCart(product.id)}
                          className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-gray-900 w-8 text-center text-lg">{inCart}</span>
                        <button
                          onClick={() => incrementCart(product.id)}
                          className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="w-4 h-4" />
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carrito modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
            <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-gray-900 p-6 text-white flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    Su Pedido
                  </h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Formulario de datos del pedido */}
                <div className="mb-6 space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">Datos del Pedido</h3>
                  
                  {/* Selector de mesa */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <UtensilsCrossed className="w-4 h-4" />
                      Mesa *
                    </label>
                    <select
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none transition-all bg-white text-gray-900"
                      required
                    >
                      <option value="" className="text-gray-900">Seleccione una mesa</option>
                      {tables.map((table) => (
                        <option key={table} value={table} className="text-gray-900">{table}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nombre del cliente */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Su nombre"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Comentarios especiales */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clipboard className="w-4 h-4" />
                      Notas Especiales {hasBeerInCart() && <span className="text-red-600">*</span>}
                    </label>
                    {hasBeerInCart() && (
                      <p className="text-sm text-amber-800 bg-amber-50 p-3 rounded mb-2 border border-amber-200">
                        🍺 Ha pedido cerveza. Por favor, indique la tapa que desee.
                      </p>
                    )}
                    <textarea
                      value={orderComment}
                      onChange={(e) => setOrderComment(e.target.value)}
                      placeholder="Ejemplo: Sin cebolla, punto de cocción, tapa deseada, etc."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none transition-all resize-none bg-white text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Lista de productos */}
                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500 text-lg font-serif">Su carrito está vacío</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">Productos Seleccionados</h3>
                    {Object.entries(cart).map(([productId, quantity]) => {
                      const product = getProductById(Number(productId));
                      if (!product) return null;
                      
                      return (
                        <div key={productId} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex-1">
                            <h4 className="font-serif font-bold text-gray-900">{product.name}</h4>
                            <p className="text-gray-600 text-sm">${product.price.toFixed(2)} c/u</p>
                          </div>
                          
                          <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-2 shadow-sm border border-gray-200">
                            <button
                              onClick={() => decrementCart(Number(productId))}
                              className="text-gray-700 hover:text-gray-900 font-bold p-1"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-gray-900 w-8 text-center">{quantity}</span>
                            <button
                              onClick={() => incrementCart(Number(productId))}
                              className="text-gray-700 hover:text-gray-900 font-bold p-1"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="font-bold text-gray-900 w-20 text-right">
                            ${(product.price * quantity).toFixed(2)}
                          </div>

                          <button
                            onClick={() => removeFromCart(Number(productId))}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {Object.keys(cart).length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-serif font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-bold text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={sendOrderToRedesis}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pagar Ahora
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Barra inferior fija con carrito */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-2xl z-40 border-t-4 border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingCart className="w-6 h-6" />
                <div>
                  <p className="font-bold text-lg">{cartItemsCount} {cartItemsCount === 1 ? 'producto' : 'productos'}</p>
                  <p className="text-sm text-gray-300">Total: ${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pagar Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
