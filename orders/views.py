from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from carts.models import Cart
from notifications.tasks import send_order_confirmation_email
from .models import Order
from .serializers import OrderSerializer
from .utils import notify_admin_order_created


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart = get_object_or_404(Cart, user_id=request.user)
        total_price = cart.total_price

        order = Order.objects.create(user=request.user, cart=cart, total_price=total_price)

        notify_admin_order_created()
        send_order_confirmation_email.delay(request.user.email, order.id)

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        order = get_object_or_404(Order, id=self.kwargs['pk'], user=self.request.user)
        return order
