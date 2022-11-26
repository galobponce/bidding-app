from django.urls import path
from .views import UserSettingListCreateView, UserSettingUpdateView


urlpatterns = [
    path('usersettings/', UserSettingListCreateView.as_view()),
    path('usersettings/<int:pk>/', UserSettingUpdateView.as_view()),
]