import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from pitapat.models import User, Chatroom, Chat


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chatroom_key = self.scope['url_route']['kwargs']['chatroom_key']
        self.room_group_name = f'chatroom_{self.chatroom_key}'
        self.chatroom = Chatroom.objects.get(key=self.chatroom_key)

    async def connect(self):
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

    def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

    # Receive message from WebSocket
    def receive(self, text_data=None, byte_data=None):
        text_data_json: dict = json.loads(text_data)
        '''
        text data example
        {
            "type": "create",
            "content": "안녕하세요 반갑습니다~",
            "author": 10
        }
        {
            "type": "update",
            "content": "채팅을 좀 바꿨어요",
            "chat": 8
        }
        {
            "type": "delete",
            "chat": 8
        }
        '''
        method_type = text_data_json['type']
        content = text_data_json.setdefault('content', None)
        author_key = text_data_json.setdefault('author', None)
        chat_key = text_data_json.setdefault('chat', None)

        if method_type == "create":
            author = User.objects.get(key=author_key)
            new_chat = Chat(
                chatroom=self.chatroom,
                author=author,
                content=content,
                valid='V'
            )
            new_chat.save()

        elif method_type == "update":
            chat = Chat.objects.get(key=chat_key)
            chat.content = content
            chat.save()
        elif method_type == "delete":
            chat = Chat.objects.get(key=chat_key)
            chat.delete()
        else:
            # invalid method type,
            return

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            text_data_json
        )

    '''
    # Receive message from room group
    def chat_message(self, event):
        chat = event['chat']

        # Send message to WebSocket
        self.send(text_data=json.dumps({'chat': chat}))
    '''
