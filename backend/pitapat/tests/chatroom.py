from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from datetime import date
from ..models import Chat, Chatroom, User


class ChatroomTestCase(TestCase):
    def setUp(self):
        setup()

    def test_chatroom(self):
        client = Client()
        user = User.objects.get(nickname='a')
        chatroom = Chatroom.objects.create(user_count=1)
        chat = Chat.objects.create(chatroom=chatroom, author=user, content='hi',
                                   reg_dt=date.today(), upd_dt=date.today())
        self.assertEqual(str(chatroom), f'chatroom {chatroom.key}')
        self.assertEqual(str(chat), f'{user.nickname}: {chat.content}')
        response = client.get(f'/chatroom/{user.key}/user/')
        self.assertEqual(response.status_code, 200)
