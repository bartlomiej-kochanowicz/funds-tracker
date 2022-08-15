up:
	docker compose up -d
down:
	docker compose down --remove-orphans -v
stop:
	docker compose stop
build:
	docker compose build --no-cache
restart:
	docker compose restart
prisma-generate:
	docker compose exec api npx prisma generate && cd api && npx prisma generate
prisma-migration:
	docker compose exec api npx prisma migrate dev
prisma-migration-push:
	docker compose exec api npx prisma db push
logs-webapp:
	docker logs -f webapp
logs-api:
	docker logs -f api
