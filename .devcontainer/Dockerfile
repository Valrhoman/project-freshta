FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    ca-certificates \
    jq \
    curl \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# OS libraries for Playwright Chromium (`npm run test:e2e`).
# Keep the version pin below in sync with `@playwright/test` in package.json,
# then rebuild the Dev Container so install-deps matches the installed browsers.
RUN npx --yes playwright@1.62.1 install-deps chromium

WORKDIR /app
RUN chown node:node /app
USER node
