import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const featured = products.filter((p) => p.status === "active").slice(0, 6);

  return (
    <section className="py-20" id="catalogo">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-4">Destaques</h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          Modelos selecionados para voce.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/catalogo"
            className="inline-block px-7 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
          >
            Ver catalogo completo
          </a>
        </div>
      </div>
    </section>
  );
}
