from rest_framework import serializers
from .models import User, Account, Transaction, Notification, Budget

# ✅ User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email',
            'first_name', 'last_name',
            'phone_number', 'address',
            'date_of_birth', 'id_document',
            'kyc_status'
        ]

# ✅ Account Serializer
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'id', 'user', 'currency',
            'balance', 'created_at'
        ]

# ✅ Transaction Serializer
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id', 'account', 'transaction_type',
            'amount', 'description', 'timestamp',
            'related_account'
        ]

# ✅ Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'message',
            'is_read', 'created_at'
        ]

# ✅ Budget Serializer
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = [
            'id', 'user', 'category',
            'amount', 'start_date', 'end_date'
        ]

