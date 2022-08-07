

FROM node:18-slim as development

WORKDIR /webapp

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

RUN apt-get update && apt-get install -y vim
RUN corepack enable && corepack prepare pnpm@7.8.0 --activate

COPY package.json pnpm-lock.yaml ./

RUN npm install -g npm
RUN pnpm install

COPY . .

CMD [ "pnpm", "start" ]