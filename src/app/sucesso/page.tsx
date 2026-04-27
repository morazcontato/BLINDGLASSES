import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagamento aprovado - BLIND",
  description: "Seu pagamento foi aprovado com sucesso!",
  robots: "noindex",
};

export default function SucessoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-[140px] pb-20 min-h-[70vh] flex items-center">
          <div className="max-w-xl mx-auto px-5 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-4">Pagamento aprovado!</h1>

            <p className="text-gray-500 leading-relaxed mb-6">
              Obrigado por comprar na BLIND! Seu pedido foi recebido e sera
              processado em breve. Voce recebera atualizacoes por e-mail.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left text-sm text-gray-500 space-y-2">
              <p>
                <span className="font-semibold text-black">Proximo passo:</span> Vamos
                preparar seu oculos e enviar com rastreamento completo.
              </p>
              <p>
                Se tiver duvidas, entre em contato pelo nosso WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="inline-block px-7 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
              >
                Ver mais modelos
              </Link>
              <Link
                href="/"
                className="inline-block px-7 py-3.5 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                Voltar ao inicio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
