import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { products } from "@/data/products";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { getMarketplaceButtons } from "@/lib/marketplace";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Produto nao encontrado - BLIND" };

  return {
    title: `${product.name} - BLIND Oculos de Sol`,
    description: product.description,
    openGraph: {
      title: `${product.name} - BLIND`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : ["/logo/BLINDLOGO.png"],
    },
  };
}

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const buttons = getMarketplaceButtons(product);
  const isSoldOut = product.status === "sold_out";

  return (
    <>
      <Header />
      <main>
        <section className="pt-[120px] pb-20">
          <div className="max-w-5xl mx-auto px-5">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-8">
              <a href="/" className="hover:text-[#4DA6FF] transition-colors">
                Inicio
              </a>
              <span className="mx-2">/</span>
              <a href="/catalogo" className="hover:text-[#4DA6FF] transition-colors">
                Catalogo
              </a>
              <span className="mx-2">/</span>
              <span className="text-black">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Imagem */}
              <div className="bg-gray-50 rounded-xl flex items-center justify-center min-h-[400px]">
                <div className="text-center p-10">
                  <svg
                    viewBox="0 0 120 60"
                    fill="none"
                    className="w-[160px] opacity-30 mb-4 mx-auto"
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
                  <p className="text-sm text-gray-400">Imagem em breve</p>
                </div>
              </div>

              {/* Info */}
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
                    {product.badge === "novo"
                      ? "Novo"
                      : product.badge === "mais-vendido"
                        ? "Mais vendido"
                        : "Premium"}
                  </span>
                )}

                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                <p className="text-gray-500 leading-relaxed mb-6">
                  {product.fullDescription}
                </p>

                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-1">Categoria: {product.category}</p>
                  <p className="text-sm text-gray-400 mb-1">SKU: {product.sku}</p>
                  {product.colors.length > 0 && (
                    <p className="text-sm text-gray-400 mb-1">
                      Cores: {product.colors.join(", ")}
                    </p>
                  )}
                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preco */}
                <div className="mb-8">
                  <p className="text-2xl font-bold">
                    {product.compareAtPrice && (
                      <span className="text-base text-gray-400 line-through font-normal mr-2">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                    <span className={product.compareAtPrice ? "text-[#4DA6FF]" : ""}>
                      {formatPrice(product.price)}
                    </span>
                  </p>
                </div>

                {/* Botoes */}
                {isSoldOut ? (
                  <div className="bg-gray-100 text-gray-500 text-center py-4 rounded-lg font-semibold">
                    Esgotado
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <a
                      href={getWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-6 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
                    >
                      Tenho interesse
                    </a>
                    {buttons
                      .filter((b) => b.marketplace !== "whatsapp")
                      .map((btn) => (
                        <a
                          key={btn.marketplace}
                          href={btn.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {btn.label}
                        </a>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <CTASection title="Gostou deste modelo?" subtitle="Veja mais opcoes no nosso catalogo." />
      </main>
      <Footer />
    </>
  );
}
