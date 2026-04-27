"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Order,
  OrderStatus,
  getOrders,
  ORDER_STATUS_LABELS,
  ORDER_ORIGIN_LABELS,
} from "@/data/orders";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import OrderForm from "@/components/admin/OrderForm";
import Link from "next/link";

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const loadOrders = useCallback(() => {
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filtered =
    filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);

  const stats = {
    total: orders.length,
    novos: orders.filter((o) => o.status === "novo").length,
    emAndamento: orders.filter((o) =>
      ["aguardando-checkout", "checkout-feito", "aguardando-rastreio"].includes(o.status)
    ).length,
    enviados: orders.filter((o) => o.status === "enviado").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-sm text-gray-400 mt-1">
            {stats.total} pedidos | {stats.novos} novos | {stats.emAndamento} em andamento |{" "}
            {stats.enviados} enviados
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2.5 bg-[#4DA6FF] text-white text-sm font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
        >
          + Adicionar pedido manual
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            filterStatus === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Todos ({orders.length})
        </button>
        {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((status) => {
          const count = orders.filter((o) => o.status === status).length;
          if (count === 0) return null;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                filterStatus === status
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {ORDER_STATUS_LABELS[status]} ({count})
            </button>
          );
        })}
      </div>

      {/* Tabela */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">Nenhum pedido ainda</p>
          <p className="text-sm">
            Clique em &quot;Adicionar pedido manual&quot; para comecar.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Pedido
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Cliente
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Produto
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Origem
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Valor
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase">
                    Data
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{order.productName}</p>
                      {order.productVariant && (
                        <p className="text-xs text-gray-400">{order.productVariant}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {ORDER_ORIGIN_LABELS[order.origin]}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">
                        R$ {order.customerPaid.toFixed(2).replace(".", ",")}
                      </p>
                      <p className="text-xs text-green-600">
                        Lucro: R$ {order.estimatedProfit.toFixed(2).replace(".", ",")}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/pedido/${order.id}`}
                        className="text-[#4DA6FF] text-xs font-semibold hover:underline"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showForm && <OrderForm onClose={() => setShowForm(false)} onSaved={loadOrders} />}
    </div>
  );
}
