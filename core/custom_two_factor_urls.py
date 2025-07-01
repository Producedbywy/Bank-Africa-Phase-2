from django.urls import include, path
from django.apps import apps

from two_factor.views import (
    BackupTokensView, DisableView, LoginView, ProfileView, QRGeneratorView,
    SetupCompleteView, SetupView,
)

app_name = "two_factor"  # This is critical for namespace resolution

# Core 2FA routes
core = [
    path('account/login/', LoginView.as_view(), name='login'),
    path('account/two_factor/setup/', SetupView.as_view(), name='setup'),
    path('account/two_factor/qrcode/', QRGeneratorView.as_view(), name='qr'),
    path('account/two_factor/setup/complete/', SetupCompleteView.as_view(), name='setup_complete'),
    path('account/two_factor/backup/tokens/', BackupTokensView.as_view(), name='backup_tokens'),
]

# Profile-related views
profile = [
    path('account/two_factor/', ProfileView.as_view(), name='profile'),
    path('account/two_factor/disable/', DisableView.as_view(), name='disable'),
]

# Plugin URLs (e.g. phonenumber plugin)
plugin_urlpatterns = []
for app_config in apps.get_app_configs():
    if app_config.name.startswith('two_factor.plugins.'):
        if app_config.name == 'two_factor.plugins.phonenumber':
            namespace = None
        else:
            namespace = app_config.label
        try:
            plugin_urlpatterns.append(
                path(
                    f'account/two_factor/{app_config.url_prefix}/',
                    include((f'{app_config.name}.urls', namespace) if namespace else f'{app_config.name}.urls')
                )
            )
        except AttributeError:
            pass

urlpatterns = core + profile + plugin_urlpatterns

