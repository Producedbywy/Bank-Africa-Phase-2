from django.contrib import admin
from django.urls import path, include
from core.views import UsernameOrEmailTokenObtainPairView, RegisterUserAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # Auth: Browsable login/logout (optional)
    path('api/auth/', include('rest_framework.urls')),

    # JWT Auth: Login (username or email) + token refresh
    path('api/token/', UsernameOrEmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Registration
    path('api/register/', RegisterUserAPIView.as_view(), name='register'),

    # Core App
    path('api/core/', include('core.urls')),

    # Currency Conversion
    path('api/currency/', include('currency.urls')),

    # Mobile Money
    path('api/momo/', include('momo.urls')),

    # ✅ Two-Factor Auth (correctly namespaced)
    path('', include('two_factor.urls', namespace='two_factor')),
]
