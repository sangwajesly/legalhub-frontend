#!/usr/bin/env bash
# setup-dev.sh — helper to prepare local dev environment for nextjs-app
# Usage: ./setup-dev.sh

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

echo "== LegalHub Next.js setup script =="

# Check for Node
if command -v node >/dev/null 2>&1; then
  echo "Node detected: $(node -v)"
else
  echo "Node not found in PATH."
  if command -v nvm >/dev/null 2>&1; then
    echo "nvm detected. Installing Node from .nvmrc..."
    nvm install || true
    nvm use || true
  else
    echo "Please install Node 18+ (use nvm, nvm-windows, or Volta)."
    exit 1
  fi
fi

# Ensure correct Node version if .nvmrc present
if [ -f .nvmrc ]; then
  NVMRC_VERSION=$(cat .nvmrc)
  echo "Recommended Node version: ${NVMRC_VERSION}"
fi

# Install packages
if [ -f package-lock.json ] || [ -f package.json ]; then
  echo "Installing node dependencies..."
  npm install
else
  echo "No package.json found — nothing to install."
fi

# Create .env.local from example if missing
if [ -f .env.example ] && [ ! -f .env.local ]; then
  echo "Creating .env.local from .env.example"
  cp .env.example .env.local
  echo "Please edit .env.local to set NEXT_PUBLIC_API_BASE_URL if needed."
fi

cat <<'EOF'

Setup complete.
Run: npm run dev
If you're on Windows (PowerShell/CMD) and don't have bash/nvm, use nvm-windows or install Node from nodejs.org.
EOF
