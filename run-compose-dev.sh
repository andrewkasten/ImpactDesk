#!/usr/bin/env bash
set -euo pipefail

COMPOSE="docker compose -f docker-compose.dev.yml"

$COMPOSE down -v
$COMPOSE build --no-cache
$COMPOSE up -d

sleep 5

$COMPOSE exec -T api python manage.py makemigrations
$COMPOSE exec -T api python manage.py migrate
$COMPOSE exec -T api python manage.py loaddata initial_data

# Create / refresh the demo account
$COMPOSE exec -T api python manage.py shell -c "
from django.contrib.auth.models import User
u, _ = User.objects.get_or_create(username='demo', defaults={'first_name': 'Demo'})
u.set_password('demo')
u.save()
"
