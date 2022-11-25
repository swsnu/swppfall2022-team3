from datetime import date

from django.test import TestCase, Client

from pitapat.models import Chat, Chatroom, User, UserChatroom
from pitapat.testutils.setup import setup


class UserChatroomTestCase(TestCase):
    def setUp(self):
        setup()

    def test_user_chatroom(self):
        client = Client()
        user = User.objects.get(nickname='a')
        chatroom = Chatroom.objects.create(user_count=1)
        Chat.objects.create(chatroom=chatroom, author=user, content='hi',
                            reg_dt=date.today(), upd_dt=date.today())

        response = client.get(f'/user/{user.key}/chatroom/')
        self.assertEqual(response.status_code, 200)

        user_chatroom = UserChatroom.objects.create(user=user, chatroom=chatroom)
        self.assertEqual(str(user_chatroom), f'user {user.key} - chatroom {chatroom.key}')
