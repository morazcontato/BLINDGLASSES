import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BLIND - Óculos de Sol com Estilo e Proteção",
  description:
    "BLIND - Óculos de sol modernos, com proteção UV e design urbano. Modelos selecionados para quem quer estilo e presença.",
  keywords: "óculos de sol, BLIND, óculos estilosos, proteção UV, moda urbana",
  openGraph: {
    title: "BLIND - Óculos de Sol com Estilo e Proteção",
    description:
      "Modelos selecionados de óculos de sol. Design moderno, proteção UV e preço acessível.",
    type: "website",
    images: ["/logo/logo.png"],
  },
};

/*
  ============================================
  PIXELS E TRACKING (descomentar quando ativo)
  ============================================

  Adicionar no <head>:

  Meta Pixel:
  <script dangerouslySetInnerHTML={{ __html: `
    !function(f,b,e,v,n,t,s){...}(window, document,'script','...');
    fbq('init', 'SEU_PIXEL_ID');
    fbq('track', 'PageView');
  `}} />

  TikTok Pixel:
  <script dangerouslySetInnerHTML={{ __html: `
    !function(w,d,t){...}(window, document, 'ttq');
    ttq.load('SEU_TIKTOK_PIXEL_ID');
    ttq.page();
  `}} />

  Google Analytics:
  <Script src="https://www.googletagmanager.com/gtag/js?id=SEU_GA_ID" strategy="afterInteractive" />
  <Script id="ga" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'SEU_GA_ID');
  `}} />
  ============================================
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`}>
      <body className="font-[var(--font-inter)] antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
