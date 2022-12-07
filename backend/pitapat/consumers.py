import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from pitapat.models import Chatroom, Chat


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self):
        super().__init__(self)
        self.user = None
        self.chatroom_key = None
        self.room_group_name = None
        self.chatroom = None

    async def connect(self):
        self.user = self.scope['user']
        self.chatroom_key = self.scope['url_route']['kwargs']['chatroom_key']
        self.room_group_name = f'chatroom_{self.chatroom_key}'
        self.chatroom = await database_sync_to_async(self.get_chatroom)()

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

        chats = await database_sync_to_async(self.get_chats)()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'load_past_messages',
                'method': 'load',
                'chats': chats,
            }
        )

    def get_chatroom(self):
        return Chatroom.objects.get(key=self.chatroom_key)

    def get_chats(self):
        def reg_dt_parser(chat):
            chat['reg_dt'] = str(chat['reg_dt'])
            return chat

        chatroom = Chatroom.objects.get(key=self.chatroom_key)
        chats = chatroom.chats.all().values('key', 'content', 'author', "reg_dt")
        return [reg_dt_parser(chat) for chat in chats]

    async def load_past_messages(self, event):
        await self.send(text_data=json.dumps({
            'method': event['method'],
            'chats': event['chats'],
        }))

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json: dict = json.loads(text_data)
        method = text_data_json['method']
        author_key = self.user.key

        # {
        #     "method": "create",
        #     "content": "안녕하세요 반갑습니다~",
        #     "author": 10
        # }
        if method == 'create':
            content = text_data_json.setdefault('message', None)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'send_message',
                    'method': method,
                    'content': content,
                    'author': author_key,
                },
            )
            await database_sync_to_async(self.create_chat)(content)

        # {
        #     "method": "update",
        #     "content": "채팅을 좀 바꿨어요",
        #     "chat": 8
        # }
        elif method == 'update':
            pass

        # {
        #     "method": "delete",
        #     "chat": 8
        # }
        elif method == 'delete':
            pass

        else:
            return

    def create_chat(self, content):
        Chat.objects.create(
            chatroom=self.chatroom,
            author=self.user,
            valid='V',
            content=content,
        )

    async def send_message(self, event):
        await self.send(text_data=json.dumps({
            'method': event['method'],
            'content': event['content'],
            'author': event['author'],
        }))
