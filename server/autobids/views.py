from .models import AutoBid
from rest_framework import generics
from rest_framework import permissions
from autobids.serializers import AutoBidSerializer


class AutoBidListCreateView(generics.ListCreateAPIView):
    """
    List or create an auto bid
    """
    permission_classes = [permissions.AllowAny]
    queryset = AutoBid.objects.all()
    serializer_class = AutoBidSerializer
    pagination_class = None


class AutoBidDeleteView(generics.DestroyAPIView):
    """
    Delete a specific auto bid
    """
    permission_classes = [permissions.AllowAny]
    queryset = AutoBid.objects.all()
    serializer_class = AutoBidSerializer