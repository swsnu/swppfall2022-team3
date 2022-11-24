from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import User


class UserPitapatTestCase(TestCase):
    def setUp(self):
        setup()

    def test_user_pitapat(self):
        client = Client()
        user_key = User.objects.get(nickname='a').key

        response = client.get(f'/user/{user_key}/pitapat/to/')
        self.assertEqual(response.status_code, 200)

        response = client.get(f'/user/{user_key}/pitapat/from/')
        self.assertEqual(response.status_code, 200)
