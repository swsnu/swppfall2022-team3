import json
from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import User



class PitapatTestCase(TestCase):
    def setUp(self):
        setup()

    def test_pitapat_create(self):
        client = Client()
        from_key = User.objects.get(nickname='a').key
        to_key = User.objects.get(nickname='b').key

        response = client.post('/pitapat/')
        self.assertEqual(response.status_code, 400)

        response = client.post('/pitapat/',
                               json.dumps({'from': from_key, 'to': to_key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/pitapat/',
                                json.dumps({'from': from_key, 'to': to_key}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 409)

        response = client.post('/pitapat/',
                                json.dumps({'from': to_key, 'to': from_key}),
                                content_type='application/json')
        self.assertEqual(response.status_code, 205)

    def test_pitapat_delete(self):
        client = Client()
        from_key = User.objects.get(nickname='a').key
        to_key = User.objects.get(nickname='b').key

        response = client.delete('/pitapat/')
        self.assertEqual(response.status_code, 400)

        response = client.delete('/pitapat/',
                               json.dumps({'from': from_key, 'to': to_key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        response = client.post('/pitapat/',
                                json.dumps({'from': from_key, 'to': to_key}),
                                content_type='application/json')
        response = client.delete('/pitapat/',
                               json.dumps({'from': from_key, 'to': to_key}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
