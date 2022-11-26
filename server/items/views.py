from .models import Item
from django.db.models import F
from rest_framework import filters
from rest_framework import generics
from autobids.models import AutoBid
from usersettings.models import UserSetting
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


        # If the change was an admin update (title, description, etc)
        # only sends the change to users
        if (old_item.last_bid_user == new_item.last_bid_user or old_item.last_bid_price >= new_item.last_bid_price):
            send_event("items_updated", "message", { "updated_item": serializer.data })
            return

        
        # --- If the change was a bid --- #

        self.make_auto_bids(new_item.id)

        # Sends change to client
        updated_item = Item.objects.filter(pk=new_item.id).values()[0]
        send_event("items_updated", "message", { "updated_item": updated_item })

        


        

    def make_auto_bids(self, item_id):
        # Get configured autobids for specific item
        configured_autobids = AutoBid.objects.filter(item=item_id).values()

        while (True):
            allowed_users = [] # To store the allowed users to make an auto bid in each iteration

            for configured_autobid in configured_autobids:

                configured_autobid_user = configured_autobid['user']

                # Gets the most updated version of the item
                item_qs = Item.objects.filter(pk=item_id).values()
                item = item_qs[0]

                # Get user settings
                user_settings = UserSetting.objects.filter(user=configured_autobid_user).values()[0]
                
                # Calculates the max amount allowed for each auto bid item
                items_with_auto_bid_enabled = len(AutoBid.objects.filter(user=configured_autobid_user).values())
                max_price_for_auto_bid = user_settings['auto_bid_max_amount'] // items_with_auto_bid_enabled

                # If the user can make an auto bid
                if item['last_bid_user'] != configured_autobid_user and item['last_bid_price'] < max_price_for_auto_bid:
                    allowed_users.append(configured_autobid_user)
                    
                    # Makes an auto bid
                    item_qs.update(last_bid_price=F('last_bid_price') + 1, last_bid_user=configured_autobid_user)

                # If the user cant autobid because of the max amount, sends notification
                elif item['last_bid_user'] != configured_autobid_user: #
                    send_event("notifications", "message", { 
                        "notification": "Could not autobid because there is not enough funds"
                    })
                    continue
                else:
                    continue
            
            # If there is no more users that can make an auto bid
            if not len(allowed_users):
                return # Breaks inf. loop
                
                
