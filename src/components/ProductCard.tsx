"use client";

import { Product } from "@/data/products";
import { formatPrice, getWhatsAppLink, trackEvent } from "@/lib/utils";
import Link from "next/link";

const badgeStyles: Record<string, string> = {
  novo: "bg-[#4DA6FF]",
  "mais-vendido": "bg-black",
  premium: "bg-gradient-to-br from-yellow-700 to-yellow-500",
};

const badgeLabels: Record<string, string> = {
  novo: "Novo",
  "mais-vendido": "Mais vendido",
  premium: "Premium",
};

function SunglassesPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-5 min-h-[200px] bg-gray-50">
      <svg
        viewBox="0 0 120 60"
        fill="none"
        className="w-[120px] opacity-30 mb-3"
      >
        <path
          d="M15 35C15 25 25 20 35 20H85C95 20 105 25 105 35C105 45 95 45 85 45H35C25 45 15 45 15 35Z"
          stroke="#999"
          strokeWidth="2"
        />
        <circle cx="35" cy="32" r="12" stroke="#999" strokeWidth="2" />
        <circle cx="85" cy="32" r="12" stroke="#999" strokeWidth="2" />
        <line x1="47" y1="32" x2="73" y2="32" stroke="#999" strokeWidth="2" />
        <line x1="1" y1="30" x2="15" y2="32" stroke="#999" strokeWidth="2" />
        <line x1="105" y1="32" x2="119" y2="30" stroke="#999" strokeWidth="2" />
      </svg>
      <p className="text-xs text-gray-400">Imagem em breve</p>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const hasMarketplace =
    product.marketplaceLinks.shopee ||
    product.marketplaceLinks.mercadoLivre ||
    product.marketplaceLinks.tiktokShop;

  const isSoldOut = product.status === "sold_out";

  function handleClick(action: string) {
    trackEvent(action, { sku: product.sku, nome: product.name });
  }

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isSoldOut ? "opacity-60" : ""}`}>
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative">
          {product.badge && (
            <span
              className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeStyles[product.badge] || "bg-gray-500"}`}
            >
              {badgeLabels[product.badge] || product.badge}
            </span>
          )}
          {isSoldOut && (
            <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
              Esgotado
            </span>
          )}
          <SunglassesPlaceholder />
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-[#4DA6FF] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2 leading-relaxed">
          {product.description}
        </p>
        {product.colors.length > 0 && (
          <p className="text-xs text-gray-400 mb-3">
            Cores: {product.colors.join(", ")}
          </p>
        )}
        <p className="text-lg font-bold mb-4">
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through font-normal mr-2">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span className={product.compareAtPrice ? "text-[#4DA6FF]" : ""}>
            {formatPrice(product.price)}
          </span>
        </p>

        <div className="flex flex-col gap-2">
          {isSoldOut ? (
            <span className="block w-full text-center px-4 py-2.5 bg-gray-200 text-gray-500 text-sm font-semibold rounded-lg">
              Esgotado
            </span>
          ) : (
          <a
            href={getWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2.5 bg-[#4DA6FF] text-white text-sm font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
            onClick={() => handleClick("click_whatsapp")}
          >
            Tenho interesse
          </a>
          )}

          {/* Botoes marketplace - so aparecem se tiver link */}
          {hasMarketplace && !isSoldOut && (
            <div className="flex flex-wrap gap-2">
              {product.marketplaceLinks.shopee && (
                <a
                  href={product.marketplaceLinks.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[100px] text-center px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => handleClick("click_marketplace")}
                >
                  Ver na Shopee
                </a>
              )}
              {product.marketplaceLinks.mercadoLivre && (
                <a
                  href={product.marketplaceLinks.mercadoLivre}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[100px] text-center px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => handleClick("click_marketplace")}
                >
                  Ver no Mercado Livre
                </a>
              )}
              {product.marketplaceLinks.tiktokShop && (
                <a
                  href={product.marketplaceLinks.tiktokShop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[100px] text-center px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => handleClick("click_marketplace")}
                >
                  Ver no TikTok Shop
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
