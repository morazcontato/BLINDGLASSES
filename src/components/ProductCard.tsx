"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import BuyButton from "./BuyButton";

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

function SunglassesPlaceholder({ category }: { category: string }) {
  return (
    <svg viewBox="0 0 200 80" fill="none" className="w-[160px] opacity-30">
      {category === "wayfarer" && (
        <>
          <rect x="20" y="20" width="65" height="45" rx="6" stroke="#222" strokeWidth="2.5" fill="none" />
          <rect x="115" y="20" width="65" height="45" rx="6" stroke="#222" strokeWidth="2.5" fill="none" />
          <path d="M85 38 Q100 48 115 38" stroke="#222" strokeWidth="2.5" fill="none" />
          <line x1="0" y1="32" x2="20" y2="28" stroke="#222" strokeWidth="2" />
          <line x1="180" y1="28" x2="200" y2="32" stroke="#222" strokeWidth="2" />
        </>
      )}
      {category === "aviator" && (
        <>
          <ellipse cx="55" cy="42" rx="35" ry="28" stroke="#B8860B" strokeWidth="2.5" fill="none" />
          <ellipse cx="145" cy="42" rx="35" ry="28" stroke="#B8860B" strokeWidth="2.5" fill="none" />
          <path d="M90 38 Q100 32 110 38" stroke="#B8860B" strokeWidth="2.5" fill="none" />
          <line x1="0" y1="30" x2="20" y2="34" stroke="#B8860B" strokeWidth="2" />
          <line x1="180" y1="34" x2="200" y2="30" stroke="#B8860B" strokeWidth="2" />
        </>
      )}
      {category === "redondo" && (
        <>
          <circle cx="55" cy="42" r="28" stroke="#222" strokeWidth="2.5" fill="none" />
          <circle cx="145" cy="42" r="28" stroke="#222" strokeWidth="2.5" fill="none" />
          <path d="M83 38 Q100 30 117 38" stroke="#222" strokeWidth="2.5" fill="none" />
          <line x1="0" y1="34" x2="27" y2="36" stroke="#222" strokeWidth="2" />
          <line x1="173" y1="36" x2="200" y2="34" stroke="#222" strokeWidth="2" />
        </>
      )}
      {category === "quadrado" && (
        <>
          <rect x="12" y="16" width="75" height="52" rx="4" stroke="#222" strokeWidth="2.5" fill="none" />
          <rect x="113" y="16" width="75" height="52" rx="4" stroke="#222" strokeWidth="2.5" fill="none" />
          <path d="M87 38 Q100 46 113 38" stroke="#222" strokeWidth="2.5" fill="none" />
          <line x1="0" y1="30" x2="12" y2="28" stroke="#222" strokeWidth="2" />
          <line x1="188" y1="28" x2="200" y2="30" stroke="#222" strokeWidth="2" />
        </>
      )}
      {category === "esportivo" && (
        <>
          <path d="M10 36 Q15 14 55 14 L100 18 L145 14 Q185 14 190 36 Q188 60 145 58 L100 54 L55 58 Q12 60 10 36Z" stroke="#222" strokeWidth="2.5" fill="none" />
          <line x1="100" y1="18" x2="100" y2="54" stroke="#222" strokeWidth="2" />
          <line x1="0" y1="34" x2="10" y2="36" stroke="#222" strokeWidth="2" />
          <line x1="190" y1="36" x2="200" y2="34" stroke="#222" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

function ProductImage({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const thumbSrc = product.thumbnail || product.images[0];
  const hasRealImage = thumbSrc && thumbSrc.endsWith(".webp");

  if (hasRealImage && !imgError) {
    return (
      <div className="flex items-center justify-center min-h-[220px] bg-white p-4">
        <Image
          src={thumbSrc}
          alt={product.name}
          width={500}
          height={300}
          className="object-contain max-h-[200px] w-auto"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-5 min-h-[220px] bg-gradient-to-b from-gray-50 to-gray-100">
      <SunglassesPlaceholder category={product.category} />
      <p className="text-xs font-medium text-gray-400 tracking-wide uppercase mt-4">
        {product.name}
      </p>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const hasPrice = product.price !== null && product.price > 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative">
          {product.badge && (
            <span
              className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeStyles[product.badge] || "bg-gray-500"}`}
            >
              {badgeLabels[product.badge] || product.badge}
            </span>
          )}
          <ProductImage product={product} />
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-[#4DA6FF] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">
          {product.description}
        </p>

        {/* Bullets */}
        {product.bullets && product.bullets.length > 0 && (
          <ul className="text-xs text-gray-400 space-y-1 mb-4">
            {product.bullets.slice(0, 3).map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#4DA6FF] rounded-full flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {product.colors.length > 0 && (
          <p className="text-xs text-gray-400 mb-4">
            Cores: {product.colors.join(", ")}
          </p>
        )}

        {hasPrice && (
          <div className="mb-4">
            <p className="text-xl font-bold">
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through font-normal mr-2">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className={product.compareAtPrice ? "text-[#4DA6FF]" : ""}>
                {formatPrice(product.price)}
              </span>
            </p>
          </div>
        )}

        {hasPrice ? (
          <BuyButton productId={product.id} className="w-full text-sm py-2.5" />
        ) : (
          <Link
            href={`/produto/${product.slug}`}
            className="block w-full text-center px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Ver detalhes
          </Link>
        )}
      </div>
    </div>
  );
}
