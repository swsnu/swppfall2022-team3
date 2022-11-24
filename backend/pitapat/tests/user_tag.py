from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import User, Tag
import json


class UserTagTestCase(TestCase):
    def setUp(self):
        setup()
        Tag.objects.create(name='soccer', type='SPORT').save()

    def test_user_tag(self):
        client = Client()
        user_key = User.objects.get(nickname='a').key
        tag = Tag.objects.get(name='soccer').key
        tags = [tag]

        response = client.post(f'/user/{user_key}/tag/',
                               json.dumps({'tags': tags}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.delete(f'/user/{user_key}/tag/',
                               json.dumps({'tags': tags}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
