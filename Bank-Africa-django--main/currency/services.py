import requests
from .models import CurrencyRate
from django.utils import timezone

API_URL = "https://open.er-api.com/v6/latest/{}"  # Example free API

def fetch_and_update_rates(base_currency):
    response = requests.get(API_URL.format(base_currency))
    if response.status_code == 200:
        data = response.json()
        rates = data.get('rates', {})
        for target_currency, rate in rates.items():
            obj, created = CurrencyRate.objects.update_or_create(
                base_currency=base_currency,
                target_currency=target_currency,
                defaults={'rate': rate, 'last_updated': timezone.now()}
            )
        return True
    return False
