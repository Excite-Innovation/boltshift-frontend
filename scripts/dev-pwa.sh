#!/usr/bin/env bash

set -e

echo "Starting PWA dev setup..."

CERT_DIR="certificates"
CERT_FILE="$CERT_DIR/dev.pem"
KEY_FILE="$CERT_DIR/dev-key.pem"
IP_FILE="$CERT_DIR/ip.txt"

mkdir -p $CERT_DIR

# -----------------------------
# Detect OS
# -----------------------------
OS="$(uname)"
echo "OS: $OS"

# -----------------------------
# Install mkcert if missing
# -----------------------------
if ! command -v mkcert &> /dev/null
then
  echo "Installing mkcert..."

  if [[ "$OS" == "Linux" ]]; then
    sudo apt update
    sudo apt install -y mkcert libnss3-tools
  elif [[ "$OS" == "Darwin" ]]; then
    brew install mkcert nss
  else
    echo " Unsupported OS \n Supported OS includes: Ubuntu/Debian, macOS, WSL"
    exit 1
  fi
fi

mkcert -install

# -----------------------------
# Detect LAN IP
# -----------------------------
if [[ "$OS" == "Linux" ]]; then
  IP=$(hostname -I | awk '{print $1}')
elif [[ "$OS" == "Darwin" ]]; then
  IP=$(ipconfig getifaddr en0)
fi

echo "Current IP: $IP"

# -----------------------------
# Check previous IP
# -----------------------------
OLD_IP=""

if [ -f "$IP_FILE" ]; then
  OLD_IP=$(cat "$IP_FILE")
fi

# -----------------------------
# Regenerate certificate if IP changed
# -----------------------------
if [[ "$IP" != "$OLD_IP" ]]; then

  echo "IP changed (or first run)"
  echo "Old IP: $OLD_IP"
  echo "New IP: $IP"

  echo "Regenerating HTTPS certificate..."

  mkcert \
    -cert-file $CERT_FILE \
    -key-file $KEY_FILE \
    $IP localhost 127.0.0.1

  echo $IP > $IP_FILE

else
  echo "IP unchanged — certificate still valid"
fi

# -----------------------------
# Install web-push if needed
# -----------------------------
if ! npm list web-push &> /dev/null
then
  echo "Installing web-push..."
  npm install web-push
  npm install -D @types/web-push
fi

# -----------------------------
# Generate VAPID keys if missing
# -----------------------------
if [ ! -f ".env.local" ]; then

  echo "Generating VAPID keys..."

  OUTPUT=$(npx web-push generate-vapid-keys)

  PUBLIC_KEY=$(echo "$OUTPUT" | grep "Public Key" | awk '{print $3}')
  PRIVATE_KEY=$(echo "$OUTPUT" | grep "Private Key" | awk '{print $3}')

  cat <<EOF > .env.local
NEXT_PUBLIC_VAPID_PUBLIC_KEY=$PUBLIC_KEY
VAPID_PRIVATE_KEY=$PRIVATE_KEY
EOF

  echo ".env.local created"

fi

# -----------------------------
# Install project dependencies
# -----------------------------
npm install

# -----------------------------
# Start Next.js with HTTPS
# -----------------------------
echo "Starting Next.js..."

npx next dev \
  --experimental-https \
  --experimental-https-cert $CERT_FILE \
  --experimental-https-key $KEY_FILE