from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user_id', 'cart_id', 'total_price', 'status', 'created_at']
        read_only_fields = ['user_id', 'cart_id', 'created_at', 'total_price']
