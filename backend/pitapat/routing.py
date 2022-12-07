from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("wss/chat/<int:chatroom_key>/", consumers.ChatConsumer.as_asgi()),
]
