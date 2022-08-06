

FROM node:18-slim

# Create app directory
WORKDIR /webapp

# Install app dependencies
COPY package.json pnpm-lock.yaml ./

COPY . .

RUN pnpm install

ENV NODE_ENV=development

CMD [ "pnpm", "start" ]