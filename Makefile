DCO = docker compose
DCO_RUN = $(DCO) run --rm

dco/down: ## Docker compose - Bring the stack down
	$(DCO) down

dco/build: ## Docker compose build
	$(DCO) build

dco/up: ## Docker compose - Bring the stack up
	$(DCO) up -d widgets_db ms_widgets padmin_widgets 

dco/logs/api: ## Docker compose - Follow the logs for api service
	$(DCO) logs -f --tail 100 ms_widgets 

migrate_db: ## Run the migration for db
	npm run migrate_db

dco/migrate_db: ## Docker compose - Run the migration for db
	$(DCO_RUN) migrate_db 

dco/refresh: ## Refresh will drop everything and start the app with new migrations
	make dco/down
	make dco/build
	make dco/up
	make dco/migrate_db

dco/stop: ## Docker compose - Stop all running containers
	$(DCO) stop

