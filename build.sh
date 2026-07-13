#!/bin/bash
set -e
pnpm turbo build --filter=finversion
rm -rf dist
cp -r apps/finversion/dist dist
echo "Build output copied to dist/"
