set -e

docker compose -f docker-compose.dev.yml down -v
docker compose --progress plain -f docker-compose.dev.yml build --no-cache 
docker compose -f docker-compose.dev.yml up -d db api frontend
