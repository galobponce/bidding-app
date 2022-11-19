from django.db import models


class Item(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    last_bid_user = models.IntegerField()
    last_bid_price = models.IntegerField()
    closes_at = models.DateTimeField()

    class Meta:
        ordering = ['closes_at']