from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Auth views
from core.views import (
    UsernameOrEmailTokenObtainPairView,
    RegisterUserAPIView,
    health as core_health,  # public /api/health/ (AllowAny) – optional if defined in core.urls
)
from rest_framework_simplejwt.views import TokenRefreshView


# Root (“/”) minimal health
def api_root(_request):
    return JsonResponse(
        {
            "message": "Lumo Backend is running ✅",
            "status": "ok",
            "version": "1.0",
            "docs": "/api/",
        }
    )


urlpatterns = [
    # ✅ Root health
    path("", api_root, name="root"),

    # Admin
    path("admin/", admin.site.urls),

    # DRF browsable auth (optional)
    path("api/auth/", include("rest_framework.urls")),

    # JWT
    path("api/token/", UsernameOrEmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # Registration
    path("api/register/", RegisterUserAPIView.as_view(), name="register"),

    # Core app (users, accounts, transactions, budgets, notifications, etc.)
    # Your core/urls.py defines paths like 'users/register/', 'accounts/', etc.
    # Mounting here makes them available as /api/<those-paths>...
    path("api/", include("core.urls")),

    # Public API health (if you added views.health as shown)
    path("api/health/", core_health, name="api_health"),

    # Currency & Mobile Money
    path("api/currency/", include("currency.urls")),
    path("api/momo/", include("momo.urls")),

    # Two-Factor Auth (custom include with namespace)
    path("", include(("core.custom_two_factor_urls", "two_factor"), namespace="two_factor")),
]
