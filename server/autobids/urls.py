from django.urls import path
from .views import AutoBidListCreateView, AutoBidDeleteView


urlpatterns = [
    path('autobids/', AutoBidListCreateView.as_view()),
    path('autobids/<int:pk>/', AutoBidDeleteView.as_view()),
]