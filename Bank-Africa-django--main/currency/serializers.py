from rest_framework import serializers
from .models import CurrencyRate

# ✅ CurrencyRate Serializer
class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = [
            'base_currency',
            'target_currency',
            'rate',
            'last_updated'
        ]
