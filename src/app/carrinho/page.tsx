import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carrinho - BLIND",
  description: "Seu carrinho de compras BLIND",
};

export default function CarrinhoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-[140px] pb-20 min-h-[70vh] flex items-center">
          <div className="max-w-xl mx-auto px-5 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-4">Pagamento cancelado</h1>

            <p className="text-gray-500 leading-relaxed mb-8">
              O pagamento foi cancelado. Nenhuma cobrança foi feita.
              Se mudou de ideia, você pode voltar ao catálogo e escolher seu modelo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="inline-block px-7 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
              >
                Ver catálogo
              </Link>
              <Link
                href="/"
                className="inline-block px-7 py-3.5 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
