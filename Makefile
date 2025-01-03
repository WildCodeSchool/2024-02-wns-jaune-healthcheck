OS := $(shell uname -s)

ifeq ($(OS), Linux)
    RM = sudo rm -rf
else ifeq ($(OS), Darwin) # macOS
    RM = sudo rm -rf
else ifeq ($(OS), Windows_NT)
    RM = rmdir /s /q
else
    RM = echo "Unsupported OS"
endif

build-dev:
	docker compose -f docker-compose.dev.yaml up --build --detach

run-dev:
	docker compose -f docker-compose.dev.yaml up

run-test:
	docker compose -f docker-compose.test.yaml up

build-prod:
	docker compose -f docker-compose.yaml up --build --detach

run-prod:
	docker compose -f docker-compose.yaml up

run-codegen:
	docker exec -it frontend npm run codegen

# Après la commande, ajouter name=(NomDeLaMigration)
generate-migration:
	docker exec -it backend npm run migration:generate -- src/database/migrations/$(name)

populate-db:
	docker exec -it backend npm run populate-db

clean-dev:
	docker compose -f docker-compose.dev.yaml down
	docker rm -f $(shell docker ps -a -q) 2> /dev/null || true
	docker volume rm $(shell docker volume ls -q) 2> /dev/null || true
	$(RM) data
	docker system prune -f