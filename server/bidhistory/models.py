from django.db import models
from items.models import Item


class BidHistory(models.Model):
    user = models.IntegerField(null=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=False)
    price = models.IntegerField(null=False)

    class Meta:
        ordering = ['-price']