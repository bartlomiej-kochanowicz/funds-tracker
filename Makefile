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
	docker compose exec api npx prisma generate
logs-webapp:
	docker logs -f webapp
logs-api:
	docker logs -f api
