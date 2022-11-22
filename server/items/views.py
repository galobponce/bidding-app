import json
from .models import Item
from rest_framework import filters
from rest_framework import generics
from autobids.models import AutoBid
from .utils import getJsonFromObject
from rest_framework import permissions
from .serializers import ItemSerializer
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
    search_fields = ["title", "description"]
    ordering_fields = ["closes_at", "last_bid_price"]


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update, delete or get an specific item
    """
    permission_classes = [permissions.AllowAny]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


    def perform_update(self, serializer):
        """
        After a bid is made, checks if there are auto bids to perform
        Also, sends event of updated item to client
        """
        old_item = self.get_object()
        new_item = serializer.save()
        send_event("items_updated", "message", {"updated_item": getJsonFromObject(new_item)})

        # If the change was a bid
        if (old_item.last_bid_user == new_item.last_bid_user or old_item.last_bid_price >= new_item.last_bid_price):
            return

        autobids = AutoBid.objects.filter(item=new_item.id).values()

        for autobid in autobids:

            # If the auto bid is from another user, make a new bid
            if autobid['user'] == new_item.last_bid_user:
                continue

            # Sets the price + 1 and the user 
            Item.objects.filter(pk=new_item.id).update(last_bid_price=new_item.last_bid_price+1, last_bid_user=autobid['user'])
            
            
