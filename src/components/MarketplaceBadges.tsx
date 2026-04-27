/**
 * MarketplaceBadges - Mostra badges de onde o produto esta disponivel
 *
 * INTEGRACOES FUTURAS:
 * - Quando TikTok Shop, Shopee ou Mercado Livre estiverem ativos,
 *   este componente mostra automaticamente os badges baseado nos links em products.ts
 */

import { Product } from "@/data/products";

export default function MarketplaceBadges({ product }: { product: Product }) {
  const { shopee, mercadoLivre, tiktokShop } = product.marketplaceLinks;
  const hasAny = shopee || mercadoLivre || tiktokShop;

  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {shopee && (
        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
          Shopee
        </span>
      )}
      {mercadoLivre && (
        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
          Mercado Livre
        </span>
      )}
      {tiktokShop && (
        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
          TikTok Shop
        </span>
      )}
    </div>
  );
}
