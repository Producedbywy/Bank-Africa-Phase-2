from rest_framework import generics, permissions
from .models import MobileMoneyPayment
from .serializers import MobileMoneyPaymentSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
import uuid

class MobileMoneyPaymentCreateView(generics.CreateAPIView):
    queryset = MobileMoneyPayment.objects.all()
    serializer_class = MobileMoneyPaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Generate a unique transaction ID
        transaction_id = str(uuid.uuid4())
        serializer.save(user=self.request.user, transaction_id=transaction_id, status='pending')

class MobileMoneyPaymentStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, transaction_id, format=None):
        try:
            payment = MobileMoneyPayment.objects.get(transaction_id=transaction_id, user=request.user)
            serializer = MobileMoneyPaymentSerializer(payment)
            return Response(serializer.data)
        except MobileMoneyPayment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=404)
