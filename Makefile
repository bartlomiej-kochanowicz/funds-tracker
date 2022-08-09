up:
	docker compose up -d
down:
	docker compose down --remove-orphans
stop:
	docker compose stop
build:
	docker compose build --no-cache
restart:
	docker compose restart
logs-webapp:
	docker logs -f webapp
logs-api:
	docker logs -f api
