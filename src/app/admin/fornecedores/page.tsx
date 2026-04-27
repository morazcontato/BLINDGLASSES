"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Supplier,
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  generateId,
} from "@/data/orders";

const DEFAULT_MESSAGE =
  "Ola, tudo bem? Fiz um pedido de oculos para envio direto ao cliente final. Por favor, enviar sem nota fiscal com valor, sem etiqueta da loja de voces e com embalagem bem protegida. Endereco de envio abaixo:";

export default function FornecedoresPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadSuppliers = useCallback(() => {
    setSuppliers(getSuppliers());
  }, []);

  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  const [form, setForm] = useState<Omit<Supplier, "id">>({
    productName: "",
    sku: "",
    supplierLink: "",
    baseCost: 0,
    estimatedDays: 0,
    packagingNotes: "",
    acceptsDropshipping: true,
    defaultMessage: DEFAULT_MESSAGE,
  });

  function resetForm() {
    setForm({
      productName: "",
      sku: "",
      supplierLink: "",
      baseCost: 0,
      estimatedDays: 0,
      packagingNotes: "",
      acceptsDropshipping: true,
      defaultMessage: DEFAULT_MESSAGE,
    });
    setEditing(null);
  }

  function handleEdit(supplier: Supplier) {
    setEditing(supplier);
    setForm({
      productName: supplier.productName,
      sku: supplier.sku,
      supplierLink: supplier.supplierLink,
      baseCost: supplier.baseCost,
      estimatedDays: supplier.estimatedDays,
      packagingNotes: supplier.packagingNotes,
      acceptsDropshipping: supplier.acceptsDropshipping,
      defaultMessage: supplier.defaultMessage,
    });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateSupplier(editing.id, form);
    } else {
      addSupplier({ id: generateId(), ...form });
    }
    resetForm();
    setShowForm(false);
    loadSuppliers();
  }

  function handleDelete(id: string) {
    if (confirm("Excluir este fornecedor?")) {
      deleteSupplier(id);
      loadSuppliers();
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4DA6FF] focus:ring-1 focus:ring-[#4DA6FF]";
  const labelClass = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Fornecedores</h1>
          <p className="text-sm text-gray-400 mt-1">
            Cadastre produtos e fornecedores para agilizar o checkout.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-5 py-2.5 bg-[#4DA6FF] text-white text-sm font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
        >
          + Novo fornecedor
        </button>
      </div>

      {/* Lista */}
      {suppliers.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">Nenhum fornecedor cadastrado</p>
          <p className="text-sm">Adicione fornecedores para facilitar o checkout dos pedidos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-sm">{s.productName}</h3>
                  <p className="text-xs text-gray-400 font-mono">{s.sku}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="text-xs text-[#4DA6FF] font-semibold hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-xs text-red-400 font-semibold hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-500">
                <p>
                  Custo: R$ {s.baseCost.toFixed(2).replace(".", ",")} | Prazo: {s.estimatedDays} dias
                </p>
                <p>Dropshipping: {s.acceptsDropshipping ? "Sim" : "Nao"}</p>
                {s.supplierLink && (
                  <a
                    href={s.supplierLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4DA6FF] hover:underline"
                  >
                    Ver fornecedor
                  </a>
                )}
                {s.packagingNotes && <p className="text-gray-400">Embalagem: {s.packagingNotes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold">
                {editing ? "Editar fornecedor" : "Novo fornecedor"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>Nome interno do produto</label>
                <input
                  required
                  value={form.productName}
                  onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: BLIND Classic Black"
                />
              </div>
              <div>
                <label className={labelClass}>SKU</label>
                <input
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: BLIND-CLB-001"
                />
              </div>
              <div>
                <label className={labelClass}>Link do fornecedor</label>
                <input
                  value={form.supplierLink}
                  onChange={(e) => setForm({ ...form, supplierLink: e.target.value })}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Custo base (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.baseCost || ""}
                    onChange={(e) => setForm({ ...form, baseCost: parseFloat(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Prazo estimado (dias)</label>
                  <input
                    type="number"
                    value={form.estimatedDays || ""}
                    onChange={(e) =>
                      setForm({ ...form, estimatedDays: parseInt(e.target.value) || 0 })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Observacao embalagem</label>
                <input
                  value={form.packagingNotes}
                  onChange={(e) => setForm({ ...form, packagingNotes: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: Enviar sem etiqueta"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.acceptsDropshipping}
                  onChange={(e) => setForm({ ...form, acceptsDropshipping: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label className="text-sm">Aceita dropshipping</label>
              </div>
              <div>
                <label className={labelClass}>Mensagem padrao para fornecedor</label>
                <textarea
                  value={form.defaultMessage}
                  onChange={(e) => setForm({ ...form, defaultMessage: e.target.value })}
                  className={inputClass}
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
                >
                  {editing ? "Salvar" : "Cadastrar"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-6 py-3 border border-gray-200 text-gray-500 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
