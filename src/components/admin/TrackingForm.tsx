"use client";

import { useState } from "react";
import { Order, updateOrder } from "@/data/orders";

interface TrackingFormProps {
  order: Order;
  onUpdate: () => void;
}

export default function TrackingForm({ order, onUpdate }: TrackingFormProps) {
  const [form, setForm] = useState({
    code: order.tracking?.code || "",
    carrier: order.tracking?.carrier || "",
    estimatedDelivery: order.tracking?.estimatedDelivery || "",
    notes: order.tracking?.notes || "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateOrder(order.id, {
      tracking: {
        code: form.code,
        carrier: form.carrier,
        estimatedDelivery: form.estimatedDelivery,
        notes: form.notes,
      },
      status: "enviado",
    });
    onUpdate();
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4DA6FF] focus:ring-1 focus:ring-[#4DA6FF]";
  const labelClass = "block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-bold mb-4">Rastreio</h3>

      {order.tracking?.code ? (
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Codigo:</span> {order.tracking.code}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Transportadora:</span> {order.tracking.carrier}
          </p>
          {order.tracking.estimatedDelivery && (
            <p className="text-sm">
              <span className="font-semibold">Previsao:</span> {order.tracking.estimatedDelivery}
            </p>
          )}
          {order.tracking.notes && (
            <p className="text-sm text-gray-500">{order.tracking.notes}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className={labelClass}>Codigo de rastreio</label>
            <input
              required
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className={inputClass}
              placeholder="Ex: BR123456789BR"
            />
          </div>
          <div>
            <label className={labelClass}>Transportadora</label>
            <input
              value={form.carrier}
              onChange={(e) => setForm({ ...form, carrier: e.target.value })}
              className={inputClass}
              placeholder="Ex: Correios, Jadlog"
            />
          </div>
          <div>
            <label className={labelClass}>Previsao de entrega</label>
            <input
              value={form.estimatedDelivery}
              onChange={(e) => setForm({ ...form, estimatedDelivery: e.target.value })}
              className={inputClass}
              placeholder="Ex: 10 a 15 dias uteis"
            />
          </div>
          <div>
            <label className={labelClass}>Observacao interna</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              rows={2}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
          >
            Salvar rastreio e marcar como Enviado
          </button>
        </form>
      )}
    </div>
  );
}
