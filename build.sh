#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Move into the Django project folder
cd Bank-Africa-django--main

# Run migrations and collect static files
python manage.py migrate
python manage.py collectstatic --noinput
