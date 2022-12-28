from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'items', ItemViewSet, basename="items")

urlpatterns = [
    path('', include(router.urls)),
]