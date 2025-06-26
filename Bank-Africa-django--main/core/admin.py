from django.contrib import admin
from .models import User, Account, Transaction, Notification, Budget

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_active')

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'currency', 'balance', 'created_at')
    search_fields = ('user__username', 'currency')
    list_filter = ('currency',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'transaction_type', 'amount', 'timestamp')
    search_fields = ('account__user__username', 'transaction_type')
    list_filter = ('transaction_type',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'is_read', 'created_at')
    search_fields = ('user__username', 'message')
    list_filter = ('is_read',)

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'amount', 'start_date', 'end_date')
    search_fields = ('user__username', 'category')
