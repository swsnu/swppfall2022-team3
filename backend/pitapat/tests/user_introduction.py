import json
from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import User, Introduction


class UserIntroductionTestCase(TestCase):
    def setUp(self):
        setup()
        Introduction.objects.create(user=User.objects.get(nickname='a'), content='hi').save()

    def test_user_introduction(self):
        client = Client()
        user_one = User.objects.get(nickname='a')
        user_email = user_one.email
        introduction = Introduction.objects.get(content='hi')
        self.assertEqual(str(introduction), f'introduction of {user_email}')
        #user_two = User.objects.get(nickname='b').key


        #response = client.get(f'/user/{user_one.key}/introduction/')
        #self.assertEqual(response.status_code, 200)

        #response = client.post(f'/user/{user_one.key}/introduction/',
        #                       json.dumps({'content': 'hello'}),
        #                       content_type='application/json')
        #self.assertEqual(response.status_code, 404)

        #response = client.post(f'/user/{user_two.key}/introduction/',
        #                       json.dumps({'content': 'hello'}),
        #                       content_type='application/json')
        #self.assertEqual(response.status_code, 200)

        response = client.put(f'/user/{user_one.key}/introduction/')
        self.assertEqual(response.status_code, 404)

        response = client.put(f'/user/{user_one.key}/introduction/',
                               json.dumps({'content': 'hello'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
