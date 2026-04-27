# Integracao com Marketplaces - BLIND

## Status atual
Estrutura preparada, sem integracoes ativas. Os produtos estao centralizados em `src/data/products.ts`.

## Marketplaces planejados

### 1. TikTok Shop
- **API**: https://open-api.tiktokglobalshop.com
- **Docs**: https://partner.tiktokshop.com/doc
- **Campo de link**: `marketplaceLinks.tiktokShop`
- **Campo de ID externo**: `marketplaceIds.tiktokShopId`
- **Pixel**: Descomentar no `src/app/layout.tsx`
- **Eventos**: view_product, click_buy (via `trackEvent` em `src/lib/utils.ts`)

### 2. Shopee
- **API**: https://partner.shopeemobile.com/api/v2
- **Docs**: https://open.shopee.com
- **Campo de link**: `marketplaceLinks.shopee`
- **Campo de ID externo**: `marketplaceIds.shopeeItemId`

### 3. Mercado Livre
- **API**: https://api.mercadolibre.com
- **Docs**: https://developers.mercadolivre.com.br
- **Campo de link**: `marketplaceLinks.mercadoLivre`
- **Campo de ID externo**: `marketplaceIds.mercadoLivreItemId`

## Como ativar um marketplace

1. Cadastrar produtos no marketplace desejado
2. Copiar o link da pagina do produto
3. Editar `src/data/products.ts`, preenchendo o campo `marketplaceLinks` correspondente
4. Opcionalmente, preencher `marketplaceIds` com o ID externo do produto para futura sincronizacao via API
5. O botao aparece automaticamente no `ProductCard` e na pagina do produto

## Funcoes utilitarias

Arquivo: `src/lib/marketplace.ts`

- `getMarketplaceButtons(product)` - Retorna botoes de compra (marketplace ou fallback WhatsApp)
- `hasMarketplaceLink(product)` - Verifica se tem link de marketplace
- `getAvailableMarketplaces(product)` - Lista marketplaces disponiveis
- `getMarketplaceProductUrl(marketplace, externalId)` - Gera URL a partir do ID externo (placeholder)

## Tracking de eventos

Arquivo: `src/lib/utils.ts`

Eventos preparados:
- `view_product` - Quando o produto e exibido
- `click_buy` - Quando o usuario clica em comprar
- `click_whatsapp` - Quando o usuario clica no WhatsApp
- `click_marketplace` - Quando o usuario clica em um marketplace

Pixels preparados (descomentar no `layout.tsx`):
- Meta Pixel (Facebook)
- TikTok Pixel
- Google Analytics (gtag)

## Proximos passos

1. Criar conta de vendedor nos marketplaces
2. Cadastrar produtos
3. Preencher links em `products.ts`
4. Ativar pixels de rastreamento
5. (Futuro) Implementar sync via API para estoque e precos automaticos
