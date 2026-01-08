import { useState, useEffect } from "react";

type CartItem = Record<number, number>;

export function useCart() {
  const [cart, setCart] = useState<CartItem>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
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

  const clearCart = () => {
    setCart({});
  };

  const getCartTotal = (products: any[]) => {
    return Object.entries(cart).reduce((acc, [id, quantity]) => {
      const product = products.find((p) => p.id === Number(id));
      return acc + (product?.attributes?.price || 0) * quantity;
    }, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    isLoaded,
  };
}
