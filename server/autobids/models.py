from django.db import models
from items.models import Item


# Model to store auto bids configured from an user to an item
class AutoBid(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    user = models.IntegerField(null=False)