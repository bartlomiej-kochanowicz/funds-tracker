up:
	docker compose up -d
down:
	docker compose down --remove-orphans
stop:
	docker compose stop
build:
	docker compose build --no-cache
