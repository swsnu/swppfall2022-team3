import json
from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import User, Tag, UserTag


class UserTagTestCase(TestCase):
    def setUp(self):
        setup()
        Tag.objects.create(name='soccer', type='SPORT').save()

    def test_user_tag(self):
        client = Client()
        user_key = User.objects.get(nickname='a').key
        tag = Tag.objects.get(name='soccer')
        tags = [tag.key]

        self.assertEqual(str(tag), tag.name)

        response = client.post(f'/api/user/{user_key}/tag/',
                               json.dumps({'tags': tags}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(str(UserTag.objects.get(tag=tag)), f'user {user_key} - tag {tag.key}')

        response = client.delete(f'/api/user/{user_key}/tag/',
                               json.dumps({'tags': tags}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
