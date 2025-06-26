from rest_framework import generics, views, response, status
from .models import CurrencyRate
from .serializers import CurrencyRateSerializer
from .services import fetch_and_update_rates

class CurrencyRateListView(generics.ListAPIView):
    serializer_class = CurrencyRateSerializer

    def get_queryset(self):
        base_currency = self.request.query_params.get('base', 'USD').upper()
        return CurrencyRate.objects.filter(base_currency=base_currency)

class CurrencyConversionView(views.APIView):
    def get(self, request, format=None):
        base = request.query_params.get('base', 'USD').upper()
        target = request.query_params.get('target', 'EUR').upper()
        amount = float(request.query_params.get('amount', 1))

        # Fetch latest rates if not present or outdated
        updated = fetch_and_update_rates(base)

        try:
            rate_obj = CurrencyRate.objects.get(base_currency=base, target_currency=target)
            converted_amount = amount * float(rate_obj.rate)
            return response.Response({
                'base': base,
                'target': target,
                'rate': rate_obj.rate,
                'amount': amount,
                'converted_amount': converted_amount,
                'last_updated': rate_obj.last_updated,
            })
        except CurrencyRate.DoesNotExist:
            return response.Response({'error': 'Conversion rate not found'}, status=status.HTTP_404_NOT_FOUND)
