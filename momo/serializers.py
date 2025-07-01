from rest_framework import serializers
from .models import MobileMoneyPayment

# ✅ Serializer for handling Mobile Money transactions
class MobileMoneyPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileMoneyPayment
        fields = [
            'id',
            'amount',
            'phone_number',
            'transaction_id',
            'status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'transaction_id',
            'status',
            'created_at',
            'updated_at',
        ]
