from .models import UserSetting
from rest_framework import serializers


class UserSettingSerializer(serializers.ModelSerializer):
    """
    Serializer for User Setting model
    """
    class Meta:
        model = UserSetting
        fields = ['id', 'user', 'auto_bid_alert', 'auto_bid_max_amount']


    def validate_user(self, value):
        """
        Checks that cannot exists more than one settings for the same user
        """
        coincidence = UserSetting.objects.filter(user=value).values()
        if coincidence:
            raise serializers.ValidationError('The user already has settings', code='invalid')

        return value


    def validate_auto_bid_alert(self, value):
        """
        Checks that the auto bid alert must in between 0 and 100
        """
        if value < 0 or value > 100:
            raise serializers.ValidationError('The auto bid alert cannot be higher than 100', code='invalid')
            
        return value