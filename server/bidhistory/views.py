from .models import BidHistory
from .serializers import BidHistorySerializer
from rest_framework import generics, permissions


class BidHistoryListView(generics.ListAPIView):
    """
    List thebid history
    """
    permission_classes = [permissions.AllowAny]
    queryset = BidHistory.objects.all()
    serializer_class = BidHistorySerializer
    pagination_class = None
    

    def get_queryset(self):
        
        # If item passed, return filtered 
        item_param = self.request.query_params.get('item', None)

        if item_param:
            return BidHistory.objects.filter(item=item_param)
            
        return super().get_queryset()