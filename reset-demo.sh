#!/usr/bin/env bash
# Wipes the production database to the initial fixture and recreates demo user.
# Intended to run nightly via cron so the public demo account stays clean and prevents misuse.
#
# Add to crontab (e.g. `crontab -e` on the EC2):
#   0 5 * * * cd /home/ec2-user/impactdesk && ./reset-demo.sh >> /var/log/impactdesk-reset.log 2>&1

set -euo pipefail
cd "$(dirname "$0")"

COMPOSE="docker compose -f docker-compose.prod.yml"

echo "[$(date -Iseconds)] reset-demo: starting"

$COMPOSE exec -T api python manage.py flush --no-input
$COMPOSE exec -T api python manage.py loaddata initial_data

$COMPOSE exec -T api python manage.py shell -c "
from django.contrib.auth.models import User
u, _ = User.objects.get_or_create(username='demo', defaults={'first_name': 'Demo'})
u.set_password('demo')
u.save()
"

echo "[$(date -Iseconds)] reset-demo: done"
