from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class MobileMoneyPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='momo_payments')
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    phone_number = models.CharField(max_length=20)
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, default='pending')  # e.g., pending, completed, failed
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"MoMo Payment {self.transaction_id} - {self.status}"
