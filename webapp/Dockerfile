

FROM node:18-slim as development

WORKDIR /webapp

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

RUN apt-get update && apt-get install -y vim && apt-get install -y g++ && apt-get install -y python3 && apt-get install -y build-essential
RUN corepack enable && corepack prepare pnpm@7.9.0 --activate

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm --force
RUN pnpm install

COPY . .

CMD [ "pnpm", "start" ]