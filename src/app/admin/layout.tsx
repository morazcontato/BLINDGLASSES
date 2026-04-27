import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin - BLIND",
  description: "Painel administrativo BLIND",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-14">
          <Link href="/admin/pedidos" className="font-bold text-sm tracking-wider">
            BLIND <span className="text-[#4DA6FF]">ADMIN</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin/pedidos"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Pedidos
            </Link>
            <Link
              href="/admin/fornecedores"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Fornecedores
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Ver site
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
