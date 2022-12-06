from django.test import TestCase, Client
from pitapat.testutils.setup import setup
from ..models import University, College, Major


class UniversityTestCase(TestCase):
    def setUp(self):
        setup()

    def test_college(self):
        client = Client()
        university= University.objects.get(name='snu')
        college = College.objects.get(name='engineering')
        major = Major.objects.get(name='CS')
        self.assertEqual(str(university), 'snu')
        self.assertEqual(str(college), 'snu engineering')
        self.assertEqual(str(major), 'snu engineering CS')

        response = client.get('/api/college/university/0/')
        self.assertEqual(response.status_code, 404)

        response = client.get(f'/api/college/university/{university.key}/')
        self.assertEqual(response.status_code, 200)

        response = client.get('/api/major/college/0/')
        self.assertEqual(response.status_code, 404)

        response = client.get(f'/api/major/college/{college.key}/')
        self.assertEqual(response.status_code, 200)
