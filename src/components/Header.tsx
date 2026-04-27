"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[72px]">
        <a href="#" className="flex-shrink-0">
          <Image
            src="/logo/BLINDLOGO.png"
            alt="BLIND"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </a>

        <nav>
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center gap-4 md:gap-8 absolute md:static top-[72px] left-0 right-0 bg-white md:bg-transparent p-6 md:p-0 shadow-lg md:shadow-none`}
          >
            <li>
              <a
                href="#hero"
                className="text-sm font-medium hover:text-[#4DA6FF] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#catalogo"
                className="text-sm font-medium hover:text-[#4DA6FF] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Catalogo
              </a>
            </li>
            <li>
              <a
                href="#diferenciais"
                className="text-sm font-medium hover:text-[#4DA6FF] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Beneficios
              </a>
            </li>
            <li>
              <a
                href="#sobre"
                className="text-sm font-medium hover:text-[#4DA6FF] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className="text-sm font-medium hover:text-[#4DA6FF] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="#catalogo"
                className="text-sm font-semibold bg-[#4DA6FF] text-white px-5 py-2.5 rounded-lg hover:bg-[#3a8fe0] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Ver catalogo
              </a>
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}
