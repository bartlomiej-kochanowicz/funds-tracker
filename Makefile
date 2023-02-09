up:
	docker compose up -d
start-webapp:
	pnpm start --port 4000 --host
down:
	docker compose down --remove-orphans -v
stop:
	docker compose stop
build:
	docker compose build --no-cache
init:
	make build && make up && make prisma-generate && make prisma-migration-push
restart:
	docker compose restart
prisma-generate:
	docker compose exec webserver npx prisma generate && cd webserver && npx prisma generate
prisma-migration:
	docker compose exec webserver npx prisma migrate dev
prisma-migration-push:
	docker compose exec webserver npx prisma db push
logs-webapp:
	docker logs -f webapp
logs-webserver:
	docker logs -f webserver
