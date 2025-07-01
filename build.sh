#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
/opt/render/project/poetry/bin/poetry install

# Run migrations and collect static files
python manage.py migrate
python manage.py collectstatic --no-input
