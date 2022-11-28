from django.urls import path
from .views import BidHistoryListView


urlpatterns = [
    path('bidhistory/', BidHistoryListView.as_view()),
]