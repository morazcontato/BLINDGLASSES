import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { products } from "@/data/products";

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
      images: ["/logo/BLINDLOGO.png"],
    },
  };
}

/** SVG placeholder por categoria - versao grande para pagina do produto */
function ProductPlaceholder({ category, name }: { category: string; name: string }) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl flex flex-col items-center justify-center min-h-[400px] p-10">
      <svg viewBox="0 0 200 80" fill="none" className="w-[220px] mb-6">
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

export default async function ProdutoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

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
              <ProductPlaceholder category={product.category} name={product.name} />

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
                  <p className="text-sm text-gray-400 mb-1">
                    Categoria: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </p>
                  {product.colors.length > 0 && (
                    <p className="text-sm text-gray-400 mb-1">
                      Cores: {product.colors.join(", ")}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mb-1">Protecao UV400</p>
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

                {/* Aviso de preco */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
                  Precos e opcoes de compra em breve.
                </div>
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
