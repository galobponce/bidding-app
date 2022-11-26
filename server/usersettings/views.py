from .models import UserSetting
from rest_framework import generics
from rest_framework import permissions
from .serializers import UserSettingSerializer

# Create your views here.
class UserSettingListCreateView(generics.ListCreateAPIView):
    """
    List or create an user config
    """
    permission_classes = [permissions.AllowAny]
    queryset = UserSetting.objects.all()
    serializer_class = UserSettingSerializer
    pagination_class = None

    def get_queryset(self):
        
        # If user passed, return filtered 
        user_param = self.request.query_params.get('user', None)

        if user_param:
            return UserSetting.objects.filter(user=user_param)
            
        return super().get_queryset()


class UserSettingUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = UserSetting.objects.all()
    serializer_class = UserSettingSerializer