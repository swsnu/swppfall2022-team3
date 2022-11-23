import json

from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
# from pitapat.models import User, Chatroom, Chat


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.chatroom_key = self.scope['url_route']['kwargs']['chatroom_key']
        # self.room_group_name = f'chatroom_{self.chatroom_key}'
        # self.chatroom = Chatroom.objects.get(key=self.chatroom_key)

    async def connect(self):
        self.chatroom_key = self.scope['url_route']['kwargs']['chatroom_key']
        self.room_group_name = f'chatroom_{self.chatroom_key}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json: dict = json.loads(text_data)
        # method_type = text_data_json['type']
        content = text_data_json.setdefault('message', None)
        # author_key = text_data_json.setdefault('author', None)
        # chat_key = text_data_json.setdefault('chat', None)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'content': content,
                # 'author': author_key,
                # 'chat': chat_key,
            },
        )
        # text data example
        # {
        #     "type": "create",
        #     "content": "안녕하세요 반갑습니다~",
        #     "author": 10
        # }
        # {
        #     "type": "update",
        #     "content": "채팅을 좀 바꿨어요",
        #     "chat": 8
        # }
        # {
        #     "type": "delete",
        #     "chat": 8
        # }

        # if method_type == "create":
        #     author = User.objects.get(key=author_key)
        #     new_chat = Chat(
        #         chatroom=self.chatroom,
        #         author=author,
        #         content=content,
        #         valid='V'
        #     )
        #     new_chat.save()

        # elif method_type == "update":
        #     chat = Chat.objects.get(key=chat_key)
        #     chat.content = content
        #     chat.save()
        # elif method_type == "delete":
        #     chat = Chat.objects.get(key=chat_key)
        #     chat.delete()
        # else:
        #     # invalid method type,
        #     return

    async def send_message(self, event):
        content = event['content']
        await self.send(text_data=json.dumps({
            'message': content,
        }))
