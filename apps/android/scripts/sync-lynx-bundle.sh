#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ANDROID_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
LYNX_DIR="$(cd "${ANDROID_DIR}/../lynx" && pwd)"
SOURCE="${LYNX_DIR}/dist/main.lynx.bundle"
DESTINATION_DIR="${ANDROID_DIR}/app/src/main/assets"

if [[ ! -f "${SOURCE}" ]]; then
  echo "Missing ${SOURCE}. Run: pnpm --filter @relay/lynx build" >&2
  exit 1
fi

mkdir -p "${DESTINATION_DIR}"
cp "${SOURCE}" "${DESTINATION_DIR}/main.lynx.bundle"
echo "Synced Relay Lynx bundle for Android."
