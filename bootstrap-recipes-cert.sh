#!/usr/bin/env bash
# Issues a Let's Encrypt cert for recipes.andrewkasten.cv by:
#   1. Commenting out the recipes :443 server block (so nginx can start without
#      cert files that don't exist yet).
#   2. Reloading nginx so it serves ACME challenges over HTTP.
#   3. Running certbot to issue the cert.
#   4. Restoring the full config (git checkout).
#   5. Reloading nginx so HTTPS for recipes goes live.
#
# Prereqs:
#   - DNS A record `recipes.andrewkasten.cv` → this host already resolves.
#   - genui is already running (its api on 127.0.0.1:8001).
#   - The impactdesk webserver container is already up.
#
# Usage:
#   ./bootstrap-recipes-cert.sh you@example.com

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <email-for-letsencrypt-account>" >&2
  exit 1
fi
EMAIL="$1"
CONF=webserver/default.conf
COMPOSE="docker compose -f docker-compose.prod.yml"

cd "$(dirname "$0")"

# Sanity: the markers must be present (added when the genui blocks were merged).
if ! grep -q '^# BEGIN recipes-443$' "$CONF"; then
  echo "ERROR: '# BEGIN recipes-443' marker not found in $CONF" >&2
  exit 1
fi

echo "==> Commenting out recipes :443 block in $CONF"
# Prefix every line between the markers (inclusive) with "# "
sed -i.bak '/^# BEGIN recipes-443$/,/^# END recipes-443$/ s/^/# /' "$CONF"

echo "==> Validating nginx config"
$COMPOSE exec -T webserver nginx -t

echo "==> Reloading nginx"
$COMPOSE exec -T webserver nginx -s reload

echo "==> Issuing cert for recipes.andrewkasten.cv"
$COMPOSE run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d recipes.andrewkasten.cv \
  --email "$EMAIL" --agree-tos --no-eff-email

echo "==> Restoring full $CONF from git"
git checkout "$CONF"
rm -f "$CONF.bak"

echo "==> Validating + reloading nginx with full config"
$COMPOSE exec -T webserver nginx -t
$COMPOSE exec -T webserver nginx -s reload

echo "==> Done. Test:  curl -I https://recipes.andrewkasten.cv"
