from django.urls import path
from .views import MobileMoneyPaymentCreateView, MobileMoneyPaymentStatusView

urlpatterns = [
    path('payments/', MobileMoneyPaymentCreateView.as_view(), name='momo-payment-create'),
    path('payments/<str:transaction_id>/', MobileMoneyPaymentStatusView.as_view(), name='momo-payment-status'),
]
