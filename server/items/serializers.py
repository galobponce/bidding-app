from .models import Item
from datetime import datetime
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Item model
    """
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'last_bid_user', 'last_bid_price', 'closes_at']


    def validate_last_bid_price(self, value):
        """
        Checks that the new bid price must be higher than the current one
        """
        if self.instance and value <= self.instance.last_bid_price:
            raise serializers.ValidationError('New bid price must be higher than current one', code='invalid')
            
        return value


    def validate_last_bid_user(self, value):
        """
        Checks if the user bidding is winning the auction
        """
        if self.instance and value == self.instance.last_bid_user:
            raise serializers.ValidationError('You cant bid if you are winning the auction', code='invalid')
            
        return value