from .models import AutoBid
from rest_framework import serializers


class AutoBidSerializer(serializers.ModelSerializer):
    """
    Serializer for Auto Bids model
    """
    class Meta:
        model = AutoBid
        fields = ['id', 'item', 'user']

    def validate(self, attrs):

        # Does not allow to set an auto bid for an item twice
        if attrs['user'] and attrs['item']:    
            coincidence = AutoBid.objects.filter(user=attrs['user'], item=attrs['item']).values()
            if coincidence:
                raise serializers.ValidationError('You cant set to auto bid an item twice', code='invalid')

        return super().validate(attrs)