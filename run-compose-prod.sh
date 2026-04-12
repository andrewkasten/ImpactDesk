docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

sleep 5
docker exec impactdesk-project-api-1 python manage.py migrate
docker exec impactdesk-project-api-1 python manage.py loaddata initial_data


