from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import University, College, Major, Tag, User
import json


class UserTestCase(TestCase):
    def setUp(self):
        self.university = University.objects.create(name='snu', location='seoul', email_domain='snu.ac.kr')
        self.university.save()
        self.college = College.objects.create(name='engineering', university=self.university)
        self.college.save()
        self.major = Major.objects.create(name='CS', college=self.college)
        self.major.save()
        self.tag = Tag.objects.create(name='soccer', type='SPORT')
        self.tag.save()

    def test_user(self):
        client = Client()

        response = client.post('/user/',
                               json.dumps({'email': 'user1@snu.ac.kr', 'password': 'qwe123', 'phone': '010-0000-000',
                                           'nickname': 'abc', 'gender': 'M', 'interested_gender': 'F', 'birthday': "1999-01-01",
                                           'university': self.university.key, 'college': self.college.key, 'major': self.major.key,
                                           'introduction': 'aaaa', 'tags': [self.tag.key]}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_user_detail(self):
        client = Client()
        client.post('/user/',
                    json.dumps({'email': 'user1@snu.ac.kr', 'password': 'qwe123', 'phone': '010-0000-000',
                                'nickname': 'abc', 'gender': 'M', 'interested_gender': 'F', 'birthday': "1999-01-01",
                                'university': self.university.key, 'college': self.college.key, 'major': self.major.key,
                                'introduction': 'aaaa', 'tags': [self.tag.key]}),
                    content_type='application/json')

        user = User.objects.get(nickname='abc')
        response = client.delete(f'/user/{user.key}/')
        self.assertEqual(response.status_code, 204)

