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

    def get_queryset(self):
        
        # If item and user passed, return filtered 
        item_param = self.request.query_params.get('item', None)
        user_param = self.request.query_params.get('user', None)

        if item_param and user_param:
            return AutoBid.objects.filter(item=item_param, user=user_param)
            
        return super().get_queryset()


class AutoBidDeleteView(generics.DestroyAPIView):
    """
    Delete a specific auto bid
    """
    permission_classes = [permissions.AllowAny]
    queryset = AutoBid.objects.all()
    serializer_class = AutoBidSerializer