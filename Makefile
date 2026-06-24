.PHONY: db-up db-down db-reset db-logs db-shell prisma-generate prisma-migrate prisma-seed prisma-studio prisma-reset

db-up:
	docker compose up -d haliverse_postgres

db-down:
	docker compose down

db-reset:
	docker compose down -v
	docker compose up -d haliverse_postgres

db-logs:
	docker compose logs -f haliverse_postgres

db-shell:
	docker exec -it haliverse_postgres psql -U haliverse -d haliverse_db

prisma-generate:
	pnpm prisma generate

prisma-migrate:
	pnpm prisma migrate dev

prisma-seed:
	pnpm prisma db seed

prisma-studio:
	pnpm prisma studio

prisma-reset:
	pnpm prisma migrate reset