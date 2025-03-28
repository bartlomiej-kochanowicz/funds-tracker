FROM node:20-slim

WORKDIR /workspace

# Install PNPM, Turbo, and Nest CLI globally
RUN npm install -g npm@latest \
    && npm install -g pnpm@8.15.4 \
    && npm install -g turbo@1.13.0 \
    && npm install -g @nestjs/cli@10.4.5

# Install additional dependencies for your stack
RUN apt-get update && apt-get install -y \
    git \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Set bash as default shell
SHELL ["/bin/bash", "-c"]