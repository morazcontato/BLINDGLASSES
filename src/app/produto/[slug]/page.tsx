"use client";

import { useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BuyButton from "@/components/BuyButton";
import { products } from "@/data/products";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";

function ProductImage({ src, name, category }: { src: string; name: string; category: string }) {
  const [imgError, setImgError] = useState(false);
  const hasReal = src.endsWith(".webp");

  if (hasReal && !imgError) {
    return (
      <div className="bg-white rounded-xl flex items-center justify-center min-h-[400px] p-8">
        <Image
          src={src}
          alt={name}
          width={1000}
          height={600}
          className="object-contain max-h-[380px] w-auto"
          priority
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl flex flex-col items-center justify-center min-h-[400px] p-10">
      <svg viewBox="0 0 200 80" fill="none" className="w-[220px] mb-6 opacity-30">
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
      <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">{name}</p>
    </div>
  );
}

export default function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const hasPrice = product.price !== null && product.price > 0;
  const mainImage = product.images[0] || "";

  return (
    <>
      <Header />
      <main>
        <section className="pt-[120px] pb-20">
          <div className="max-w-5xl mx-auto px-5">
            <nav className="text-sm text-gray-400 mb-8">
              <a href="/" className="hover:text-[#4DA6FF] transition-colors">Início</a>
              <span className="mx-2">/</span>
              <a href="/catalogo" className="hover:text-[#4DA6FF] transition-colors">Catálogo</a>
              <span className="mx-2">/</span>
              <span className="text-black">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ProductImage src={mainImage} name={product.name} category={product.category} />

              <div>
                {product.badge && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4 ${
                      product.badge === "novo"
                        ? "bg-[#4DA6FF]"
                        : product.badge === "mais-vendido"
                          ? "bg-black"
                          : "bg-gradient-to-br from-yellow-700 to-yellow-500"
                    }`}
                  >
                    {product.badge === "novo" ? "Novo" : product.badge === "mais-vendido" ? "Mais vendido" : "Premium"}
                  </span>
                )}

                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-sm text-gray-400 mb-4">{product.type}</p>

                <p className="text-gray-500 leading-relaxed mb-6">
                  {product.fullDescription}
                </p>

                {/* Bullets */}
                {product.bullets.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {product.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#4DA6FF] rounded-full flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-1">
                    Categoria: {product.type}
                  </p>
                  {product.colors.length > 0 && (
                    <p className="text-sm text-gray-400 mb-1">
                      Cores: {product.colors.join(", ")}
                    </p>
                  )}
                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {hasPrice ? (
                  <div className="mb-8">
                    <p className="text-3xl font-bold mb-6">
                      {product.compareAtPrice && (
                        <span className="text-lg text-gray-400 line-through font-normal mr-2">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                      <span className={product.compareAtPrice ? "text-[#4DA6FF]" : ""}>
                        {formatPrice(product.price)}
                      </span>
                    </p>

                    <div className="flex flex-col gap-3">
                      <BuyButton productId={product.id} className="w-full" />
                      <a
                        href={getWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-6 py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors"
                      >
                        Comprar via WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500 mb-8">
                    Preços e opções de compra em breve.
                  </div>
                )}

                <div className="border-t border-gray-100 pt-6 space-y-2 text-xs text-gray-400">
                  <p>Pagamento seguro via Stripe</p>
                  <p>Envio para todo o Brasil com rastreamento</p>
                  <p>Proteção UV400 garantida</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CTASection title="Gostou deste modelo?" subtitle="Veja mais opções no nosso catálogo." />
      </main>
      <Footer />
    </>
  );
}
