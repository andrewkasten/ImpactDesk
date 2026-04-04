#!/bin/sh
set -e

until python manage.py migrate --noinput; do
  echo "Database not ready yet, retrying migrations..."
  sleep 2
done

exec gunicorn --bind 0.0.0.0:8000 --workers 3 --access-logfile - --error-logfile - --capture-output config.wsgi:application
