from django.urls import path
from .views import CurrencyRateListView, CurrencyConversionView

urlpatterns = [
    path('rates/', CurrencyRateListView.as_view(), name='currency-rate-list'),
    path('convert/', CurrencyConversionView.as_view(), name='currency-convert'),
]
