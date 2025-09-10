#!/usr/bin/env bash
set -euo pipefail
PAT='(https?://)?demo\.nopcommerce\.com'

echo "== git tracked =================================================="
git --no-pager grep -nI -E "$PAT" -- . || true

echo
echo "== all files (incl. untracked, excluding junk) ================="
grep -RIn --binary-files=without-match \
  --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=build --exclude-dir=coverage --exclude-dir=.cache \
  -E "$PAT" . || true
