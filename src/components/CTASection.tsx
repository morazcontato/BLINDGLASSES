import { getWhatsAppLink } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  catalogLabel?: string;
  whatsappLabel?: string;
}

export default function CTASection({
  title = "Escolha seu próximo óculos BLIND.",
  subtitle = "Estilo, proteção e presença em um só lugar.",
  catalogLabel = "Ver catálogo",
  whatsappLabel = "Falar no WhatsApp",
}: CTASectionProps) {
  return (
    <section className="bg-black text-white py-20 text-center" id="contato">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-400 text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/catalogo"
            className="inline-block px-7 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors"
          >
            {catalogLabel}
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            {whatsappLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
