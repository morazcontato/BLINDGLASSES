import Image from "next/image";
import { getWhatsAppLink } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="pt-[140px] pb-20 min-h-[90vh] flex items-center" id="hero">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-black">
            Óculos de sol com estilo, proteção e presença.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            A BLIND nasce para quem quer elevar o visual com peças modernas,
            versáteis e acessíveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#catalogo"
              className="inline-block px-7 py-3.5 bg-[#4DA6FF] text-white font-semibold rounded-lg hover:bg-[#3a8fe0] transition-colors text-center"
            >
              Ver modelos
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-colors text-center"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/logo/BLINDLOGO.png"
            alt="BLIND Óculos de Sol"
            width={400}
            height={400}
            className="max-w-[280px] md:max-w-[400px] w-full drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
