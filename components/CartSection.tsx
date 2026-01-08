interface CartSectionProps {
  cart: Record<number, number>;
  products: any[];
  total: number;
  onRemoveFromCart: (productId: number) => void;
  onSendOrder: () => Promise<void>;
  isLoading?: boolean;
}

export function CartSection({
  cart,
  products,
  total,
  onRemoveFromCart,
  onSendOrder,
  isLoading,
}: CartSectionProps) {
  const itemCount = Object.keys(cart).length;
  const isCartEmpty = itemCount === 0;

  return (
    <section className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-4">🛒 Carrito de Compras</h2>
      {isCartEmpty ? (
        <p className="text-gray-500">El carrito está vacío</p>
      ) : (
        <>
          {Object.entries(cart).map(([productId, quantity]) => {
            const product = products.find((p) => p.id === Number(productId));
            if (!product) return null;

            const itemTotal = product.attributes.price * quantity;

            return (
              <div
                key={productId}
                className="flex justify-between items-center mb-3 pb-3 border-b"
              >
                <div>
                  <span className="font-semibold">{product.attributes.name}</span>
                  <span className="text-gray-600 ml-2">x {quantity}</span>
                  <span className="text-gray-600 ml-4">${itemTotal.toFixed(2)}</span>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 font-semibold px-3 py-1 rounded hover:bg-red-50"
                  onClick={() => onRemoveFromCart(Number(productId))}
                >
                  Quitar
                </button>
              </div>
            );
          })}
          <div className="text-xl font-bold mt-4 pt-3 border-t">
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}

      {/* Botón pagar */}
      <button
        onClick={onSendOrder}
        disabled={isCartEmpty || isLoading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg text-lg font-bold w-full transition mt-4"
      >
        {isLoading ? "⏳ Procesando..." : "💳 Enviar pedido a Redesis para pagar"}
      </button>
    </section>
  );
}
