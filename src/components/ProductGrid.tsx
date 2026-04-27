import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section className="py-20" id="catalogo">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-4">Catalogo</h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          Encontre o modelo perfeito para voce.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
