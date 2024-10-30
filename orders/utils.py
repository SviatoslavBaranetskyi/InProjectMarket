from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def notify_admin_order_created():
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'admin_notifications',
        {
            'type': 'send_notification',
            'message': 'A new order has been created!'
        }
    )
