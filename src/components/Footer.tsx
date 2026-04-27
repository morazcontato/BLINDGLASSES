import Image from "next/image";
import { getWhatsAppLink, getInstagramLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-8">
          <div>
            <Image
              src="/logo/BLINDLOGO.png"
              alt="BLIND"
              width={100}
              height={32}
              className="h-8 w-auto brightness-0 invert mb-3"
            />
            <p className="text-sm text-gray-500">
              Estilo, protecao e presenca.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">
              Navegacao
            </h4>
            <a href="/" className="block text-sm text-gray-400 mb-2 hover:text-[#4DA6FF] transition-colors">
              Inicio
            </a>
            <a href="/catalogo" className="block text-sm text-gray-400 mb-2 hover:text-[#4DA6FF] transition-colors">
              Catalogo
            </a>
            <a href="/#diferenciais" className="block text-sm text-gray-400 mb-2 hover:text-[#4DA6FF] transition-colors">
              Beneficios
            </a>
            <a href="/#sobre" className="block text-sm text-gray-400 mb-2 hover:text-[#4DA6FF] transition-colors">
              Sobre
            </a>
            <a href="/#faq" className="block text-sm text-gray-400 mb-2 hover:text-[#4DA6FF] transition-colors">
              FAQ
            </a>
            <a href="/#contato" className="block text-sm text-gray-400 hover:text-[#4DA6FF] transition-colors">
              Contato
            </a>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <a
              href={getInstagramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-gray-400 mr-5 hover:text-[#4DA6FF] transition-colors"
            >
              Instagram
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-gray-400 hover:text-[#4DA6FF] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-5 text-center">
          <p className="text-xs text-gray-600">
            &copy; 2026 BLIND. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
