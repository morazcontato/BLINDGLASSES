import { Product } from "@/data/products";
import { WHATSAPP_NUMBER } from "@/lib/utils";

/**
 * ============================================
 * MARKETPLACE UTILITIES
 * ============================================
 * Funcoes para integracao com marketplaces.
 * Hoje gera links e fallbacks.
 * No futuro: conectar com APIs reais.
 *
 * INTEGRACOES FUTURAS:
 *
 * TikTok Shop API:
 *   - Endpoint: https://open-api.tiktokglobalshop.com
 *   - Docs: https://partner.tiktokshop.com/doc
 *   - Usar marketplaceIds.tiktokShopId para sync de estoque/preco
 *
 * Shopee Open Platform:
 *   - Endpoint: https://partner.shopeemobile.com/api/v2
 *   - Docs: https://open.shopee.com
 *   - Usar marketplaceIds.shopeeItemId para sync
 *
 * Mercado Livre API:
 *   - Endpoint: https://api.mercadolibre.com
 *   - Docs: https://developers.mercadolivre.com.br
 *   - Usar marketplaceIds.mercadoLivreItemId para sync
 * ============================================
 */

export type MarketplaceName = "tiktokShop" | "shopee" | "mercadoLivre";

export interface MarketplaceButton {
  label: string;
  url: string;
  marketplace: MarketplaceName | "whatsapp";
}

const marketplaceLabels: Record<MarketplaceName, string> = {
  tiktokShop: "TikTok Shop",
  shopee: "Shopee",
  mercadoLivre: "Mercado Livre",
};

/**
 * Retorna lista de botoes de compra para um produto.
 * Se o produto tem links de marketplace, retorna eles.
 * Se nao, retorna fallback para WhatsApp.
 */
export function getMarketplaceButtons(product: Product): MarketplaceButton[] {
  const buttons: MarketplaceButton[] = [];
  const links = product.marketplaceLinks;

  (Object.keys(links) as MarketplaceName[]).forEach((key) => {
    if (links[key]) {
      buttons.push({
        label: `Ver no ${marketplaceLabels[key]}`,
        url: links[key],
        marketplace: key,
      });
    }
  });

  if (buttons.length === 0) {
    const msg = encodeURIComponent(
      `Ola! Tenho interesse no modelo ${product.name} (SKU: ${product.sku}).`
    );
    buttons.push({
      label: "Comprar via WhatsApp",
      url: `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,
      marketplace: "whatsapp",
    });
  }

  return buttons;
}

/**
 * Verifica se o produto esta disponivel em algum marketplace.
 */
export function hasMarketplaceLink(product: Product): boolean {
  const links = product.marketplaceLinks;
  return !!(links.tiktokShop || links.shopee || links.mercadoLivre);
}

/**
 * Retorna os marketplaces disponiveis para um produto.
 */
export function getAvailableMarketplaces(product: Product): MarketplaceName[] {
  const available: MarketplaceName[] = [];
  const links = product.marketplaceLinks;
  if (links.tiktokShop) available.push("tiktokShop");
  if (links.shopee) available.push("shopee");
  if (links.mercadoLivre) available.push("mercadoLivre");
  return available;
}

/**
 * Gera URL de produto no marketplace a partir do ID externo.
 * Placeholder — substituir pelas URLs reais quando integrar.
 */
export function getMarketplaceProductUrl(
  marketplace: MarketplaceName,
  externalId: string
): string | null {
  if (!externalId) return null;

  // Substituir por URLs reais quando integrar:
  // switch (marketplace) {
  //   case "shopee":
  //     return `https://shopee.com.br/product/${externalId}`;
  //   case "mercadoLivre":
  //     return `https://www.mercadolivre.com.br/p/${externalId}`;
  //   case "tiktokShop":
  //     return `https://www.tiktok.com/shop/product/${externalId}`;
  // }

  return null;
}
