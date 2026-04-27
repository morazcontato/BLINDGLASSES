import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catalogo - BLIND Oculos de Sol",
  description:
    "Confira todos os modelos de oculos de sol BLIND. Design moderno, protecao UV e preco acessivel.",
  openGraph: {
    title: "Catalogo - BLIND Oculos de Sol",
    description:
      "Confira todos os modelos de oculos de sol BLIND. Design moderno, protecao UV e preco acessivel.",
  },
};

export default function CatalogoPage() {
  const activeProducts = products.filter((p) => p.status !== "draft");

  const categories = [...new Set(activeProducts.map((p) => p.category))];

  return (
    <>
      <Header />
      <main>
        <section className="pt-[120px] pb-20">
          <div className="max-w-7xl mx-auto px-5">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Catalogo BLIND
            </h1>
            <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
              Todos os modelos selecionados para voce.
            </p>

            {/* Filtro por categoria */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <span className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-full">
                Todos
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              ))}
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Produtos esgotados */}
            {activeProducts.some((p) => p.status === "sold_out") && (
              <div className="mt-16">
                <h2 className="text-xl font-bold text-center mb-8 text-gray-400">
                  Esgotados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60">
                  {activeProducts
                    .filter((p) => p.status === "sold_out")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
