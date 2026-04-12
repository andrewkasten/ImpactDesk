
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d

sleep 5
docker exec impactdesk-api-1 python manage.py migrate
