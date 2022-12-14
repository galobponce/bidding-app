from .models import Item
from django.db.models import F
from django.conf import settings
from autobids.models import AutoBid
from django.core.mail import send_mail
from .serializers import ItemSerializer
from bidhistory.models import BidHistory
from django_eventstream import send_event
from usersettings.models import UserSetting
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework import filters, generics, permissions, viewsets


# Usage of class based and generic views to keep the code DRY

class ItemList(generics.ListCreateAPIView):
    '''
    List or create an Item
    '''
    permission_classes = [permissions.AllowAny]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['closes_at', 'last_bid_price']


    def get_queryset(self):

        # If user passed, returns items bid by user
        user_param = self.request.query_params.get('user', None)

        # If history passed, search items bid historically by user
        history_param = self.request.query_params.get('history', False)


        if user_param and history_param:
            item_ids = []
            item_ids_qs = BidHistory.objects.filter(user=user_param).values_list('item_id', flat=True)

            for item_id in item_ids_qs:
                item_ids.append(item_id)

            return Item.objects.filter(pk__in=item_ids)


        return super().get_queryset()


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['closes_at', 'last_bid_price']


    def get_queryset(self):

        # If user passed, returns items bid by user
        user_param = self.request.query_params.get('user', None)

        # If history passed, search items bid historically by user
        history_param = self.request.query_params.get('history', False)


        if user_param and history_param:
            item_ids = []
            item_ids_qs = BidHistory.objects.filter(user=user_param).values_list('item_id', flat=True)

            for item_id in item_ids_qs:
                item_ids.append(item_id)

            return Item.objects.filter(pk__in=item_ids)


        return super().get_queryset()


    @action(detail=True)
    def send_item_won_email(self, request, pk=None):
        '''
        Sends an alert to the winning user of the item that he won the item
        '''

        if (pk):
            item = Item.objects.filter(pk=pk).values()[0]
            user = item['last_bid_user']

            if user:
                user_settings = UserSetting.objects.filter(user=user).values()[0]
                email = user_settings['email']

                if email:
                    recipient_list = [email]
                    send_mail(f'You won the item: "{item["title"]}"', 'You have won it!', settings.EMAIL_HOST_USER, recipient_list)

        return Response(status=HTTP_200_OK)


    def perform_update(self, serializer):
        '''
        After a bid is made, checks if there are auto bids to perform
        Also, sends event of updated item to client
        '''
        old_item = self.get_object()
        new_item = serializer.save()


        # If the change was an admin update (title, description, etc)
        # only sends the change to users
        if (old_item.last_bid_user == new_item.last_bid_user or old_item.last_bid_price >= new_item.last_bid_price):
            send_event('items_updated', 'message', { 'updated_item': serializer.data })
            return

        
        # --- If the change was a bid --- #

        # Make a bid history
        BidHistory(item=new_item, user=new_item.last_bid_user, price=new_item.last_bid_price).save()

        self.make_auto_bids(new_item.id)

        # Sends change to client
        updated_item = Item.objects.filter(pk=new_item.id).values()[0]

        
        # If the user winnig changed, send notification to old user
        if old_item.last_bid_user:
            old_user_settings = UserSetting.objects.filter(user=old_item.last_bid_user).values()[0]
            if old_user_settings['email']:
                recipient_list = [old_user_settings['email']]
                send_mail(f'Another user has bid the item: "{updated_item["title"]}"', 'You are no longer winnig the bid on that item', settings.EMAIL_HOST_USER, recipient_list)

        send_event('items_updated', 'message', { 'updated_item': updated_item })

        self.bid_alert(updated_item['last_bid_user'])


    def bid_alert(self, user_id):
        '''
        Notifies if user used the configured (or more) percentage of max amount for all his bids
        '''
        user_settings = UserSetting.objects.filter(user=user_id).values()[0]
        auto_bid_max_amount = user_settings['auto_bid_max_amount']
        auto_bid_alert = user_settings['auto_bid_alert'] / 100
        items_bid_by_user = Item.objects.filter(last_bid_user=user_id).values()
        total_money_bid = 0
        current_item = None

        for item in items_bid_by_user:
            current_item = item
            total_money_bid += item['last_bid_price']

        if total_money_bid >= auto_bid_max_amount * auto_bid_alert:
            send_event('notifications', 'message', { 
                'notification': { 
                    'to': user_id,
                    'message': 'You have used the configured percentage of the max amount for your bids' 
                }
            })

            if user_settings['email']:
                recipient_list = [user_settings['email']]
                send_mail(f'Alert for: "{current_item["title"]}"', 'You have used the configured percentage of the max amount for your bids', settings.EMAIL_HOST_USER, recipient_list)


    def make_auto_bids(self, item_id):
        '''
        Makes corresponding auto bids for an item
        '''

        # Get configured autobids for specific item
        configured_autobids = AutoBid.objects.filter(item=item_id).values()

        while (True):
            allowed_users = [] # To store the allowed users to make an auto bid in each iteration

            for configured_autobid in configured_autobids:

                configured_autobid_user = configured_autobid['user']

                # Gets the most updated version of the item
                item_qs = Item.objects.filter(pk=item_id)
                item = item_qs[0]

                # Get user settings
                user_settings = UserSetting.objects.filter(user=configured_autobid_user).values()[0]
                
                # Calculates the max amount allowed for each auto bid item
                items_with_auto_bid_enabled = len(AutoBid.objects.filter(user=configured_autobid_user).values())
                max_price_for_auto_bid = user_settings['auto_bid_max_amount'] // items_with_auto_bid_enabled


                # If the user can make an auto bid
                if item.last_bid_user != configured_autobid_user and item.last_bid_price < max_price_for_auto_bid:
                    allowed_users.append(configured_autobid_user)
                    
                    # Makes an auto bid
                    item_qs.update(last_bid_price=F('last_bid_price') + 1, last_bid_user=configured_autobid_user)

                    # Make a bid history
                    BidHistory(item=item, user=item.last_bid_user, price=item.last_bid_price + 1).save()


                # If the user cant autobid because of the max amount, sends notification
                elif item.last_bid_user != configured_autobid_user: #
                    send_event('notifications', 'message', { 
                        'notification': {
                            'to': configured_autobid_user,
                            'message': 'Could not autobid because there is not enough funds'
                        } 
                    })

                    if user_settings['email']:
                        recipient_list = [user_settings['email']]
                        send_mail(f'Could not bid item "{item.title}"', 'There is not enough funds', settings.EMAIL_HOST_USER, recipient_list)

                    continue
                else:
                    continue
            
            # If there is no more users that can make an auto bid
            if not len(allowed_users):
                return # Breaks inf. loop
                
