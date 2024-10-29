from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, CategoryViewSet, TagViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'tags', TagViewSet, basename='tags')

urlpatterns = [
    path('', include(router.urls)),
]
