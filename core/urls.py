from django.urls import path
from . import views

urlpatterns = [

    path("health/", views.health, name="health"),  # <- public health check
    
    # User management
   path('users/register/', views.RegisterUserAPIView.as_view(), name='user-register'),
    path('users/profile/', views.UserProfileView.as_view(), name='user-profile'),

    # Account management
    path('accounts/', views.AccountListCreateView.as_view(), name='account-list-create'),
    path('accounts/<int:pk>/', views.AccountDetailView.as_view(), name='account-detail'),

    # Transactions
    path('transactions/', views.TransactionListCreateView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', views.TransactionDetailView.as_view(), name='transaction-detail'),

    # Notifications
    path('notifications/', views.NotificationListView.as_view(), name='notification-list'),
    path('notifications/create/', views.NotificationCreateView.as_view(), name='notification-create'),
    path('notifications/<int:pk>/', views.NotificationDetailView.as_view(), name='notification-detail'),

    # Budgeting
    path('budgets/', views.BudgetListCreateView.as_view(), name='budget-list-create'),
    path('budgets/<int:pk>/', views.BudgetDetailView.as_view(), name='budget-detail'),
    path('budgets/spending-summary/', views.BudgetSpendingSummaryView.as_view(), name='budget-spending-summary'),
]
