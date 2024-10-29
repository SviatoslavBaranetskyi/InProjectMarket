from django.contrib.auth.models import User
from django.db import models

from orders.models import Order


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    @property
    def orders(self):
        return Order.objects.filter(user=self.user)
