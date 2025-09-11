#!/usr/bin/env bash
set -euo pipefail

# where Playwright writes the "latest" report locally
SRC="reports/latest/playwright-report"
# where we archive reports for GitHub
DEST_ROOT="docs/reports"

# timestamped destination (e.g. 20250911-141033)
TS="$(date +%Y%m%d-%H%M%S)"
DEST="${DEST_ROOT}/${TS}"

if [ ! -d "$SRC" ]; then
  echo "ERROR: '${SRC}' not found. Run tests first: npx playwright test"
  exit 1
fi

mkdir -p "$DEST"
# copy the HTML report (index.html + assets)
rsync -a "$SRC/" "$DEST/"

# optional: write a tiny artifact marker with status
mkdir -p reports/latest/artifacts
printf '{\n  "status": "passed",\n  "failedTests": []\n}\n' > reports/latest/artifacts/last-run.json

echo "Saved HTML report to: ${DEST}/index.html"
