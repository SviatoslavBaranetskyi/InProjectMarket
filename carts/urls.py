from django.urls import path
from .views import CartDetailView, CartItemCreateView, CartItemUpdateDeleteView

urlpatterns = [
    path('', CartDetailView.as_view(), name='cart-detail'),
    path('items', CartItemCreateView.as_view(), name='cartitem-create'),
    path('items/<int:pk>', CartItemUpdateDeleteView.as_view(), name='cartitem-update-delete'),
]