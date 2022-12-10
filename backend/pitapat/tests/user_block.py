from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import User, Block


class UserBlockTestCase(TestCase):
    def setUp(self):
        setup()

    def test_user_block(self):
        client = Client()
        from_user = User.objects.get(nickname='a')
        to_user = User.objects.get(nickname='b')
        Block.objects.create(is_from=from_user, to=to_user)

        response = client.get(f'/api/user/{from_user.key}/block/')
        self.assertEqual(response.status_code, 200)
