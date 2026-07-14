#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
LYNX_DIR="$(cd "${IOS_DIR}/../lynx" && pwd)"
SOURCE="${LYNX_DIR}/dist/main.lynx.bundle"
DESTINATION_DIR="${IOS_DIR}/Relay/Resources/Lynx"

if [[ ! -f "${SOURCE}" ]]; then
  echo "Missing ${SOURCE}. Run: pnpm --filter @relay/lynx build" >&2
  exit 1
fi

mkdir -p "${DESTINATION_DIR}"
cp "${SOURCE}" "${DESTINATION_DIR}/main.lynx.bundle"
echo "Synced Relay Lynx bundle for iOS."
