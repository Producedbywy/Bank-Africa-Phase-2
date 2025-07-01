from django.contrib import admin
from django.urls import path, include
from core.views import EmailTokenObtainPairView, RegisterUserAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # Auth: Browsable API login/logout (optional)
    path('api/auth/', include('rest_framework.urls')),

    # JWT Auth: Email-based login + token refresh
    path('api/token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ✅ Registration endpoint
    path('api/register/', RegisterUserAPIView.as_view(), name='register'),

    # Core App: User, Accounts, Transactions, Notifications, Budget
    path('api/core/', include('core.urls')),

    # Currency Conversion API
    path('api/currency/', include('currency.urls')),

    # Mobile Money API
    path('api/momo/', include('momo.urls')),

    # Optional: Two-Factor Auth (if enabled in settings and installed)
    # path('', include('two_factor.urls')),
]

