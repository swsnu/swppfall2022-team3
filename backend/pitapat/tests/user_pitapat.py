from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import Chatroom, User, UserChatroom


class UserPitapatTestCase(TestCase):
    def setUp(self):
        setup()

    def test_user_pitapat(self):
        client = Client()
        user_name_a = User.objects.get(nickname='a')
        user_name_b = User.objects.get(nickname='b')

        response = client.get(f'/api/user/{user_name_a.key}/pitapat/to/')
        self.assertEqual(response.status_code, 200)

        response = client.get(f'/api/user/{user_name_a.key}/pitapat/from/')
        self.assertEqual(response.status_code, 200)

        chatroom = Chatroom.objects.create(user_count=2)
        UserChatroom.objects.create(chatroom=chatroom, user=user_name_a)


        response = client.get(f'/api/user/{user_name_a.key}/pitapat/to/')
        self.assertEqual(response.status_code, 200)

        response = client.get(f'/api/user/{user_name_a.key}/pitapat/from/')
        self.assertEqual(response.status_code, 200)

        UserChatroom.objects.create(chatroom=chatroom, user=user_name_b)

        response = client.get(f'/api/user/{user_name_a.key}/pitapat/to/')
        self.assertEqual(response.status_code, 200)

        response = client.get(f'/api/user/{user_name_a.key}/pitapat/from/')
        self.assertEqual(response.status_code, 200)
