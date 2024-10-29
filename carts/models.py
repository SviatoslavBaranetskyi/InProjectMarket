from django.contrib.auth.models import User
from django.db import models

from products.models import Product


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Cart for {self.user.username}'

    @property
    def total_price(self):
        return sum(item.total_price for item in self.cartitem_set.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.cartitem_set.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} x {self.product.name} in cart for {self.cart.user_id.username}'

    @property
    def total_price(self):
        return self.product.price * self.quantity
