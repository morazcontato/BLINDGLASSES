#!/bin/bash
# ============================================
# BLIND - Otimizador de imagens de produtos
# ============================================
# USO:
#   1. Salve as fotos dos fornecedores em raw-products/
#      Nomeie como: blind-classic-black.jpg (ou .png, .webp)
#   2. Rode: bash scripts/optimize-images.sh
#   3. As imagens otimizadas vão para public/products/sunglasses/
# ============================================

set -e

RAW_DIR="raw-products"
OUTPUT_DIR="public/products/sunglasses"
THUMB_DIR="$OUTPUT_DIR/thumbs"

mkdir -p "$OUTPUT_DIR" "$THUMB_DIR"

# Verificar se tem sips (macOS) ou cwebp
if ! command -v sips &> /dev/null; then
  echo "❌ sips não encontrado. Este script é para macOS."
  echo "Para Linux, instale: sudo apt install webp"
  exit 1
fi

# Verificar se tem cwebp para conversão webp
HAS_CWEBP=false
if command -v cwebp &> /dev/null; then
  HAS_CWEBP=true
fi

count=0

for raw_file in "$RAW_DIR"/*; do
  [ -f "$raw_file" ] || continue

  filename=$(basename "$raw_file")
  name="${filename%.*}"

  echo "📷 Processando: $filename"

  if [ "$HAS_CWEBP" = true ]; then
    # Converter para webp com cwebp (melhor qualidade)
    # Imagem principal: max 1000px largura, qualidade 80
    cwebp -q 80 -resize 1000 0 "$raw_file" -o "$OUTPUT_DIR/$name.webp" 2>/dev/null

    # Thumbnail: max 500px largura, qualidade 75
    cwebp -q 75 -resize 500 0 "$raw_file" -o "$THUMB_DIR/$name-thumb.webp" 2>/dev/null
  else
    # Fallback: usar sips (macOS) para redimensionar + converter
    # Imagem principal
    cp "$raw_file" "/tmp/$name-temp.jpg"
    sips --resampleWidth 1000 "/tmp/$name-temp.jpg" --out "/tmp/$name-main.jpg" &>/dev/null

    # Thumbnail
    cp "$raw_file" "/tmp/$name-temp2.jpg"
    sips --resampleWidth 500 "/tmp/$name-temp2.jpg" --out "/tmp/$name-thumb.jpg" &>/dev/null

    # Se tiver cwebp, converte. Se não, copia como jpg
    if command -v cwebp &> /dev/null; then
      cwebp -q 80 "/tmp/$name-main.jpg" -o "$OUTPUT_DIR/$name.webp" 2>/dev/null
      cwebp -q 75 "/tmp/$name-thumb.jpg" -o "$THUMB_DIR/$name-thumb.webp" 2>/dev/null
    else
      # Sem cwebp: salvar como jpg (ainda funciona, ProductCard tem fallback)
      cp "/tmp/$name-main.jpg" "$OUTPUT_DIR/$name.webp"
      cp "/tmp/$name-thumb.jpg" "$THUMB_DIR/$name-thumb.webp"
      echo "   ⚠️ cwebp não instalado. Instale com: brew install webp"
    fi

    rm -f /tmp/$name-temp*.jpg /tmp/$name-main.jpg /tmp/$name-thumb.jpg
  fi

  count=$((count + 1))
  echo "   ✅ $name.webp + $name-thumb.webp"
done

if [ "$count" -eq 0 ]; then
  echo ""
  echo "⚠️ Nenhuma imagem encontrada em $RAW_DIR/"
  echo ""
  echo "Salve as imagens dos fornecedores em raw-products/ com estes nomes:"
  echo "  blind-classic-black.jpg"
  echo "  blind-aviator-gold.jpg"
  echo "  blind-retro-round.jpg"
  echo "  blind-bold-square.jpg"
  echo "  blind-sport-vision.jpg"
  echo ""
  echo "Depois rode novamente: bash scripts/optimize-images.sh"
else
  echo ""
  echo "✅ $count imagens otimizadas!"
  echo "📁 Imagens: $OUTPUT_DIR/"
  echo "📁 Thumbs:  $THUMB_DIR/"
  echo ""
  echo "Tamanhos finais:"
  ls -lh "$OUTPUT_DIR"/*.webp 2>/dev/null
  echo ""
  ls -lh "$THUMB_DIR"/*.webp 2>/dev/null
fi
