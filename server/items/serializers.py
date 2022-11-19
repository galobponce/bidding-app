from .models import Item
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer for Item model
    """
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'last_bid_user', 'last_bid_price', 'closes_at']