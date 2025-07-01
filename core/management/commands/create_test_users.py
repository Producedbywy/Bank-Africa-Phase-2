from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create test users for development and testing'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username='testuser1').exists():
            User.objects.create_user(username='testuser1', email='test1@example.com', password='TestPass123')
            self.stdout.write(self.style.SUCCESS('Created test user: testuser1'))
        else:
            self.stdout.write('Test user testuser1 already exists')

        if not User.objects.filter(username='testuser2').exists():
            User.objects.create_user(username='testuser2', email='test2@example.com', password='TestPass123')
            self.stdout.write(self.style.SUCCESS('Created test user: testuser2'))
        else:
            self.stdout.write('Test user testuser2 already exists')
