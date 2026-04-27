"use client";

import { useState } from "react";

interface BuyButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  label?: string;
}

export default function BuyButton({
  productId,
  quantity = 1,
  className = "",
  label = "Comprar agora",
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erro ao iniciar pagamento. Tente novamente.");
        setLoading(false);
      }
    } catch {
      alert("Erro de conexao. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`px-6 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? "Processando..." : label}
    </button>
  );
}
