#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IOS_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_ROOT="$(cd "${IOS_DIR}/../.." && pwd)"
MASTER="${REPO_ROOT}/assets/brand/relay-app-icon.svg"
OUTPUT="${IOS_DIR}/Relay/Resources/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png"

mkdir -p "$(dirname "${OUTPUT}")"
sips -s format png "${MASTER}" --out "${OUTPUT}" >/dev/null
sips -z 1024 1024 "${OUTPUT}" >/dev/null

echo "Generated ${OUTPUT#${REPO_ROOT}/} from assets/brand/relay-app-icon.svg"
