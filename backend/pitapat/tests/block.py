import json
from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import Block, Chatroom, User, UserChatroom, Pitapat


class BlockTestCase(TestCase):
    def setUp(self):
        setup()

    def test_block_create(self):
        client = Client()
        from_user = User.objects.get(nickname='a')
        to_user = User.objects.get(nickname='b')

        response = client.post('/api/block/')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/block/',
                               json.dumps({'from': 99999, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/block/',
                               json.dumps({'from': from_user.key, 'to': 99999}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/api/block/',
                               json.dumps({'from': from_user.key, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/block/',
                               json.dumps({'from': from_user.key, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 409)

        block = Block.objects.get(is_from=from_user)
        block.delete()
        chatroom = Chatroom.objects.create(user_count=2)
        UserChatroom.objects.create(chatroom=chatroom, user=from_user)
        UserChatroom.objects.create(chatroom=chatroom, user=to_user)
        Pitapat.objects.create(is_from=from_user, to=to_user)
        Pitapat.objects.create(is_from=to_user, to=from_user)

        response = client.post('/api/block/',
                               json.dumps({'from': from_user.key, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_block_delete(self):
        client = Client()
        from_user = User.objects.get(nickname='a')
        to_user = User.objects.get(nickname='b')

        response = client.delete('/api/block/')
        self.assertEqual(response.status_code, 400)

        response = client.delete('/api/block/',
                               json.dumps({'from': 99999, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/block/',
                               json.dumps({'from': from_user.key, 'to': 99999}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.delete('/api/block/',
                               json.dumps({'from': from_user.key, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        Block.objects.create(is_from=from_user, to=to_user)
        response = client.delete('/api/block/',
                               json.dumps({'from': from_user.key, 'to': to_user.key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
