from django.db import models

# Model to store user settings
class UserSetting(models.Model):
    user = models.IntegerField(null=False)
    email = models.EmailField(null=True)
    auto_bid_alert = models.IntegerField()
    auto_bid_max_amount = models.IntegerField()