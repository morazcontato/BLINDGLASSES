"use client";

import { useState } from "react";
import {
  Order,
  OrderOrigin,
  ORDER_ORIGIN_LABELS,
  generateOrderNumber,
  generateId,
  addOrder,
  getSuppliers,
} from "@/data/orders";
import { products } from "@/data/products";

interface OrderFormProps {
  onClose: () => void;
  onSaved: () => void;
}

export default function OrderForm({ onClose, onSaved }: OrderFormProps) {
  const suppliers = getSuppliers();

  const [form, setForm] = useState({
    origin: "manual" as OrderOrigin,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    productId: "",
    productName: "",
    productVariant: "",
    quantity: 1,
    customerPaid: 0,
    supplierCost: 0,
    supplierLink: "",
    notes: "",
  });

  function handleProductChange(productId: string) {
    const product = products.find((p) => p.id === productId);
    const supplier = suppliers.find((s) => s.sku === product?.sku);
    setForm((prev) => ({
      ...prev,
      productId,
      productName: product?.name || "",
      supplierLink: supplier?.supplierLink || prev.supplierLink,
      supplierCost: supplier?.baseCost || prev.supplierCost,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const order: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      origin: form.origin,
      status: "novo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      customerEmail: form.customerEmail,
      customerAddress: {
        street: form.street,
        number: form.number,
        complement: form.complement,
        neighborhood: form.neighborhood,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        country: "Brasil",
      },
      productId: form.productId,
      productName: form.productName,
      productVariant: form.productVariant,
      quantity: form.quantity,
      customerPaid: form.customerPaid,
      supplierCost: form.supplierCost,
      estimatedProfit: form.customerPaid - form.supplierCost * form.quantity,
      supplierLink: form.supplierLink,
      supplierCheckoutDone: false,
      supplierCheckoutDate: "",
      tracking: null,
      notes: form.notes,
    };

    addOrder(order);

    // Notificacao (chamar API)
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).catch(() => {});

    onSaved();
    onClose();
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4DA6FF] focus:ring-1 focus:ring-[#4DA6FF] bg-white";
  const labelClass = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">Novo Pedido</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Origem */}
          <div>
            <label className={labelClass}>Origem do pedido</label>
            <select
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value as OrderOrigin })}
              className={inputClass}
            >
              {(Object.keys(ORDER_ORIGIN_LABELS) as OrderOrigin[]).map((key) => (
                <option key={key} value={key}>
                  {ORDER_ORIGIN_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          {/* Cliente */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold mb-2">Cliente</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Nome</label>
                <input
                  required
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Telefone</label>
                <input
                  value={form.customerPhone}
                  onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                className={inputClass}
              />
            </div>
          </fieldset>

          {/* Endereco */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold mb-2">Endereco de entrega</legend>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className={labelClass}>Rua</label>
                <input
                  required
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Numero</label>
                <input
                  required
                  value={form.number}
                  onChange={(e) => setForm({ ...form, number: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Complemento</label>
                <input
                  value={form.complement}
                  onChange={(e) => setForm({ ...form, complement: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bairro</label>
                <input
                  required
                  value={form.neighborhood}
                  onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Cidade</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Estado</label>
                <input
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className={inputClass}
                  maxLength={2}
                  placeholder="SP"
                />
              </div>
              <div>
                <label className={labelClass}>CEP</label>
                <input
                  required
                  value={form.zipCode}
                  onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Produto */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold mb-2">Produto</legend>
            <div>
              <label className={labelClass}>Produto BLIND</label>
              <select
                value={form.productId}
                onChange={(e) => handleProductChange(e.target.value)}
                className={inputClass}
              >
                <option value="">Selecione ou digite manualmente</option>
                {products
                  .filter((p) => p.status === "active")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Nome do produto</label>
                <input
                  required
                  value={form.productName}
                  onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Variacao / Cor</label>
                <input
                  value={form.productVariant}
                  onChange={(e) => setForm({ ...form, productVariant: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: Preto, Dourado"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Quantidade</label>
              <input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
                className={inputClass}
              />
            </div>
          </fieldset>

          {/* Financeiro */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold mb-2">Financeiro</legend>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Valor pago pelo cliente (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  value={form.customerPaid || ""}
                  onChange={(e) => setForm({ ...form, customerPaid: parseFloat(e.target.value) || 0 })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Custo do fornecedor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  value={form.supplierCost || ""}
                  onChange={(e) =>
                    setForm({ ...form, supplierCost: parseFloat(e.target.value) || 0 })
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Fornecedor */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold mb-2">Fornecedor</legend>
            <div>
              <label className={labelClass}>Link do produto no fornecedor</label>
              <input
                value={form.supplierLink}
                onChange={(e) => setForm({ ...form, supplierLink: e.target.value })}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </fieldset>

          {/* Observacoes */}
          <div>
            <label className={labelClass}>Observacoes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={inputClass}
              rows={3}
            />
          </div>

          {/* Botoes */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
            >
              Criar pedido
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 text-gray-500 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
