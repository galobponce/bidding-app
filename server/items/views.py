from .models import Item
from rest_framework import generics
from rest_framework import permissions
from .serializers import ItemSerializer
from rest_framework import filters
from django_eventstream import send_event


# Usage of class based and generic views to keep the code DRY

class ItemList(generics.ListCreateAPIView):
    """
    List or create an Item
    """
    permission_classes = [permissions.AllowAny]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['closes_at', 'last_bid_price']


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update, delete or get an specific item
    """
    permission_classes = [permissions.AllowAny]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def patch(self, request, *args, **kwargs):
        res = super().patch(request, *args, **kwargs)

        # If change has been made
        if res.status_code == 200:
            # Sends event of updated item to client 
            send_event('items_updated', 'message', {
                'updated_item': res.data
            })

        return res