from .models import UserSetting
from rest_framework import serializers


class UserSettingSerializer(serializers.ModelSerializer):
    """
    Serializer for User Setting model
    """
    class Meta:
        model = UserSetting
        fields = ['id', 'user', 'email', 'auto_bid_alert', 'auto_bid_max_amount']


    def validate_user(self, value):
        """
        Checks that cannot exists more than one settings for the same user
        """
        coincidence = UserSetting.objects.filter(user=value).values()
        if coincidence:
            raise serializers.ValidationError('The user already has settings', code='invalid')

        return value


    def validate_email(self, value):
        """
        Checks that cannot exists more than one user with the same email
        """
        coincidence = UserSetting.objects.filter(email=value).values()
        if coincidence:
            raise serializers.ValidationError('The email is already in use', code='invalid')

        return value


    def validate_auto_bid_alert(self, value):
        """
        Checks that the auto bid alert must in between 0 and 100
        """
        if value > 100:
            raise serializers.ValidationError('The auto bid alert cannot be higher than 100', code='invalid')

        if value < 0:
            raise serializers.ValidationError('The auto bid alert cannot be lower than 0', code='invalid')
            
        return value

    def validate_auto_bid_max_amount(self, value):
        """
        Checks that the max auto bid amount must be greater than 0
        """
        if value < 0:
            raise serializers.ValidationError('The max auto bid amount cannot be lower than 0', code='invalid')
            
        return value