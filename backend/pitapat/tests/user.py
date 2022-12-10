import json
import tempfile
from datetime import date
from django.test import TestCase, Client
from PIL import Image
from ..models import University, College, Major, Tag, User, Chatroom, UserChatroom


class UserTestCase(TestCase):
    def setUp(self):
        self.university = University.objects.create(name='snu',
                                                    location='seoul',
                                                    email_domain='snu.ac.kr'
                                                    )
        self.university.save()
        self.college = College.objects.create(name='engineering', university=self.university)
        self.college.save()
        college = College.objects.create(name='col', university=self.university)
        college.save()
        self.major = Major.objects.create(name='CS', college=self.college)
        self.major.save()
        major = Major.objects.create(name='mjr', college=college)
        major.save()
        self.tag = Tag.objects.create(name='soccer', type='SPORT')
        self.tag.save()
        tag = Tag.objects.create(name='sleep', type='HOBBY')
        tag.save()
        User.objects.create(nickname='a', email='snu1@snu.ac.kr', university=self.university,
                                    college=college, major=major, birthday=date.today(),
                                    phone='000-0000-0000').save()

    def test_user(self):
        client = Client()

        response = client.post('/api/user/')
        self.assertEqual(response.status_code, 400)

        response = client.post('/api/user/',
                               json.dumps({'email': 'user1@snu.ac.kr',
                                           'password': 'qwe123',
                                           'nickname': 'abc',
                                           'gender': 'M',
                                           'interested_gender': 'F',
                                           'birthday': "1999-01-01",
                                           'university': self.university.key,
                                           'college': self.college.key,
                                           'major': self.major.key,
                                           'introduction': 'aaaa',
                                           'tags': [self.tag.key]
                                           }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        client.post('/api/auth/login/',
                    json.dumps({'username': 'abc',
                                'email': 'user1@snu.ac.kr',
                                'password': 'qwe123'
                                }),
                    content_type='application/json')

        user = User.objects.get(nickname='abc')
        user_name_a = User.objects.get(nickname='a')
        chatroom = Chatroom.objects.create(user_count=2)
        UserChatroom.objects.create(user=user_name_a, chatroom=chatroom)
        UserChatroom.objects.create(user=user, chatroom=chatroom)

        response = client.get('/api/user/',
                              ({'page': 1,
                                'gender': 'M',
                                'age_min': 11,
                                'age_max': 31,
                                'colleges_included': [self.college.key],
                                'colleges_excluded': [College.objects.get(name='col').key],
                                'majors_included': [self.major.key],
                                'majors_excluded': [Major.objects.get(name='mjr').key],
                                'tags_included': [self.tag.key],
                                'tags_excluded': [Tag.objects.get(name='sleep').key]
                              })
                              )
        self.assertEqual(response.status_code, 200)

    def test_user_detail(self):
        client = Client()
        client.post('/api/user/',
                    json.dumps({'email': 'user1@snu.ac.kr',
                                'password': 'qwe123',
                                'nickname': 'abc',
                                'gender': 'M',
                                'interested_gender': 'F',
                                'birthday': "1999-01-01",
                                'university': self.university.key,
                                'college': self.college.key,
                                'major': self.major.key,
                                'introduction': 'aaaa',
                                'tags': [self.tag.key]}),
                    content_type='application/json')

        user = User.objects.get(nickname='abc')
        self.assertEqual(str(user), user.email)

        image = Image.new('RGB', (100, 100))
        with tempfile.NamedTemporaryFile(suffix='.jpg') as file:
            tmp_file = file
            image.save(tmp_file)
            tmp_file.seek(0)
            response = client.post(f'/api/photo/user/{user.key}/',
                                   {'file': tmp_file},
                                   format='multipart'
                                   )

        response = client.delete(f'/api/user/{user.key}/')
        self.assertEqual(response.status_code, 204)

    def test_user_exist(self):
        client = Client()

        response = client.get('/api/user/exist/snu1@snu.ac.kr')
        self.assertEqual(response.status_code, 200)
