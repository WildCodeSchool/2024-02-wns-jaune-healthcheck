build-dev:
	docker compose -f docker-compose.dev.yaml up --build

run-dev:
	docker compose -f docker-compose.dev.yaml up

run-test:
	docker compose -f docker-compose.test.yaml up

build-prod:
	docker compose -f docker-compose.yaml up --build

run-prod:
	docker compose -f docker-compose.yaml up