"use client"

import { useState } from "react"
import { ChevronDown, Eye, Trash2, CheckCircle, Clock, XCircle } from "lucide-react"

interface Order {
  id: number
  table: string
  amount: Record<number, number>
  total: number
  order_status: "Pending" | "Completed" | "Cancelled"
  comment: string
  createdAt: string
  item_menus: number[]
}

interface OrdersTableProps {
  orders: Order[]
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pendiente
          </span>
        )
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Completado
          </span>
        )
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            Cancelado
          </span>
        )
    }
  }

  const getItemsCount = (order: Order) => {
    return Object.values(order.amount || {}).reduce((sum, qty) => sum + qty, 0)
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-gray-600 text-lg font-lora">No hay pedidos que mostrar</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Acciones</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Mesa</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Artículos</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Fecha/Hora</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="contents">
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setExpandedOrder(expandedOrder === order.id ? null : order.id)
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          expandedOrder === order.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 font-lora">
                      {order.table}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-lora">
                      {getItemsCount(order)} artículos
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900 text-lg">
                      ${order.total.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(order.order_status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-lora">
                    {new Date(order.createdAt).toLocaleString("es-CO")}
                  </td>
                </tr>

                {/* Fila expandida */}
                {expandedOrder === order.id && (
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={6} className="px-6 py-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-playfair font-bold text-gray-900 mb-3">
                            Detalles de la Orden
                          </h4>

                          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">
                              Comentarios/Notas:
                            </h5>
                            <p className="text-gray-700 font-lora whitespace-pre-wrap">
                              {order.comment || "Sin comentarios"}
                            </p>
                          </div>

                          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">
                              Items Ordenados:
                            </h5>
                            <div className="space-y-2">
                              {Object.entries(order.amount || {}).map(
                                ([productId, quantity]) => (
                                  <div
                                    key={productId}
                                    className="flex justify-between text-gray-700 font-lora"
                                  >
                                    <span>Producto ID: {productId}</span>
                                    <span className="font-semibold">x{quantity}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
                            <CheckCircle className="w-4 h-4" />
                            Completar
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
                            <Trash2 className="w-4 h-4" />
                            Cancelar
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                            <Eye className="w-4 h-4" />
                            Ver Factura
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
