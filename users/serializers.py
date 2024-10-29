from django.contrib.auth.models import User
from rest_framework import serializers

from orders.serializers import OrderSerializer
from .models import Profile


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField()
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    phone_number = serializers.CharField(max_length=15)
    address = serializers.CharField(max_length=255, required=False)

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        phone_number = validated_data['phone_number']
        address = validated_data.get('address')

        # Create and save a new user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        profile = Profile.objects.create(user=user, phone_number=phone_number, address=address)

        return user


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'phone_number', 'address', 'email', 'orders']

    def update(self, instance, validated_data):
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.save()

        user_data = validated_data.get('user', {})
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()
        return instance
