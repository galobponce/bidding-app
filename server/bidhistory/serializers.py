from .models import BidHistory
from rest_framework import serializers


class BidHistorySerializer(serializers.ModelSerializer):
    """
    Serializer for Bid History model
    """
    class Meta:
        model = BidHistory
        fields = ['id', 'item', 'user', 'price']