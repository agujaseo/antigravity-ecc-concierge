#!/usr/bin/env bash
# Instala Antigravity ECC Concierge globalmente en Linux o macOS (~/.gemini/config/plugins/ecc-concierge)

set -e

PLUGIN_NAME="ecc-concierge"
TARGET_DIR="$HOME/.gemini/config/plugins/$PLUGIN_NAME"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Instalando Antigravity ECC Concierge en $TARGET_DIR..."

mkdir -p "$TARGET_DIR"

cp "$SOURCE_DIR/plugin.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/README.md" "$TARGET_DIR/"
cp -r "$SOURCE_DIR/data" "$TARGET_DIR/"
cp -r "$SOURCE_DIR/scripts" "$TARGET_DIR/"
cp -r "$SOURCE_DIR/skills" "$TARGET_DIR/"

echo "✓ Antigravity ECC Concierge instalado con éxito en $TARGET_DIR"
