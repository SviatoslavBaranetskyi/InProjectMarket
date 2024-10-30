from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail


@shared_task
def send_registration_email(user_email):
    send_mail(
        subject="Welcome to InProjectMarket!",
        message="Thank you for registering with us.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user_email],
        fail_silently=False,
    )


@shared_task
def send_order_confirmation_email(user_email, order_id):
    send_mail(
        subject="Your Order Confirmation",
        message=f"Thank you for your order! Your order number is {order_id}.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user_email],
        fail_silently=False,
    )
