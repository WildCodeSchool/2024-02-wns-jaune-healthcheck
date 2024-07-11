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

# Après la commande, ajouter src/database/migrations/nom_de_la_migration.ts
generate-migration:
	docker exec -it backend npm run migration:generate

populate-db:
	docker exec -it backend npm run populate-db