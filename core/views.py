from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from .models import Account, Transaction, Notification, Budget
from .serializers import (
    UserSerializer,
    AccountSerializer,
    TransactionSerializer,
    NotificationSerializer,
    BudgetSerializer,
)

User = get_user_model()

# -------------------- AUTH + REGISTER --------------------

class RegisterUserAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['password'] = make_password(data.get('password'))
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
            }
        }, status=status.HTTP_201_CREATED)


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")  # frontend sends email as "username"
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user with that email.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        attrs["username"] = user.username  # internally map email → username
        data = super().validate(attrs)

        # ✅ Include user info in the token response
        data["user_id"] = user.id
        data["username"] = user.username
        data["email"] = user.email

        return data


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


# -------------------- PROFILE --------------------

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# -------------------- ACCOUNTS --------------------

class AccountListCreateView(generics.ListCreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)


# -------------------- TRANSACTIONS --------------------

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(account__user=self.request.user)

    def perform_create(self, serializer):
        transaction_type = serializer.validated_data.get('transaction_type')
        amount = serializer.validated_data.get('amount')
        account = serializer.validated_data.get('account')
        related_account = serializer.validated_data.get('related_account')

        if transaction_type in ['send', 'withdraw']:
            if account.balance < amount:
                raise serializers.ValidationError("Insufficient balance.")
            account.balance -= amount
            account.save()
        elif transaction_type in ['receive', 'deposit']:
            account.balance += amount
            account.save()

        if transaction_type == 'send' and related_account:
            related_account.balance += amount
            related_account.save()

        serializer.save()


class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(account__user=self.request.user)


# -------------------- NOTIFICATIONS --------------------

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class NotificationCreateView(generics.CreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


# -------------------- BUDGET --------------------

class BudgetListCreateView(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)


class BudgetSpendingSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        budgets = Budget.objects.filter(user=user)
        summary = []
        for budget in budgets:
            spent = Transaction.objects.filter(
                account__user=user,
                timestamp__range=(budget.start_date, budget.end_date),
                transaction_type='withdraw',
            ).aggregate(total=models.Sum('amount'))['total'] or 0

            summary.append({
                'budget_id': budget.id,
                'category': budget.category,
                'amount': budget.amount,
                'spent': spent,
                'remaining': budget.amount - spent,
                'start_date': budget.start_date,
                'end_date': budget.end_date,
            })

        return Response(summary)
