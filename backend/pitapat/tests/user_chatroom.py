from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from datetime import date
from ..models import Chat, Chatroom,User, UserChatroom


class UserChatroomTestCase(TestCase):
    def setUp(self):
        setup()

    def test_user_chatroom(self):
        client = Client()
        user_one = User.objects.get(nickname='a')
        user_two = User.objects.get(nickname='b')
        chatroom = Chatroom.objects.create(user_count=2)
        Chat.objects.create(chatroom=chatroom, author=user_one, content='hi',
                            reg_dt=date.today(), upd_dt=date.today())
        user_chatroom = UserChatroom.objects.create(user=user_one, chatroom=chatroom)
        UserChatroom.objects.create(user=user_two, chatroom=chatroom)

        response = client.get(f'/user/{user_one.key}/chatroom/')
        self.assertEqual(response.status_code, 200)

        self.assertEqual(str(user_chatroom), f'user {user_one.key} - chatroom {chatroom.key}')
