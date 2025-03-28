FROM node:20-slim

WORKDIR /workspace

# Install PNPM, Turbo, and Nest CLI globally
RUN npm install -g npm@latest \
    && npm install -g pnpm@8.15.4 \
    && npm install -g turbo@1.13.0 \
    && npm install -g @nestjs/cli@10.4.5

# Install additional dependencies for your stack, including zsh and curl
RUN apt-get update && apt-get install -y \
    git \
    procps \
    openssh-client \
    zsh \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Configure Git user from environment variables
RUN if [ -n "$GIT_USER_NAME" ]; then git config --global user.name "$GIT_USER_NAME"; fi \
    && if [ -n "$GIT_USER_EMAIL" ]; then git config --global user.email "$GIT_USER_EMAIL"; fi

# Install Oh My Zsh (non-interactive)
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
    && echo "source ~/.zshrc" >> ~/.bashrc

# Set zsh as the default shell
RUN chsh -s /bin/zsh

# Set zsh as the default shell for the container
SHELL ["/bin/zsh", "-c"]