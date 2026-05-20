#!/usr/bin/env bash
set -euo pipefail

COMPOSE="docker compose -f docker-compose.prod.yml"

$COMPOSE build
$COMPOSE up -d db api webserver

# Wait for the api container to be ready before migrating.
sleep 5

$COMPOSE exec -T api python manage.py migrate
$COMPOSE exec -T api python manage.py loaddata initial_data

# Create / refresh the demo account
$COMPOSE exec -T api python manage.py shell -c "
from django.contrib.auth.models import User
u, _ = User.objects.get_or_create(username='demo', defaults={'first_name': 'Demo'})
u.set_password('demo')
u.save()
"
