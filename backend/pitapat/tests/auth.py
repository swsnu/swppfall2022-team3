import json

from django.test import TestCase, Client

from pitapat.testutils.setup import setup
from pitapat.utils.crypto import create_verification_code


class AuthTestCase(TestCase):
    def setUp(self):
        setup()

    def test_auth_email(self):
        client = Client()
        email = 'tjd3507@snu.ac.kr'
        request_time = '2022-11-18 16:59:42'

        response = client.post('/auth/email/')
        self.assertEqual(response.status_code, 400)

        response = client.post(
            '/auth/email/',
            json.dumps({'email': 'snu1@snu.ac.kr', 'request_time': request_time}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 409)

        response = client.post('/auth/email/',
                               json.dumps({'email': email, 'request_time': request_time}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_auth_verify(self):
        client = Client()
        email = 'tjd3507@snu.ac.kr'
        request_time = '2022-11-18 16:59:42'
        code = create_verification_code(email, request_time)

        response = client.post('/auth/verify/')
        self.assertEqual(response.status_code, 400)

        response = client.post(
            '/auth/verify/',
            json.dumps({'email': email, 'request_time': request_time, 'code': 'aaaaaa'}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 401)

        response = client.post(
            '/auth/verify/',
            json.dumps({'email': email, 'request_time': request_time, 'code': code}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 204)
