import tempfile
from django.test import TestCase, Client
from PIL import Image
from pitapat.testutils.setup import setup
from ..models import User


class UserPhotoTestCase(TestCase):
    def setUp(self):
        setup()

    def test_user_pitapat(self):
        client = Client()
        user = User.objects.get(nickname='a')

        response = client.get('/api/user/9999/photo/')
        self.assertEqual(response.status_code, 404)

        image = Image.new('RGB', (100, 100))
        with tempfile.NamedTemporaryFile(suffix='.jpg') as file:
            tmp_file = file
            image.save(tmp_file)
            tmp_file.seek(0)
            response = client.post(f'/api/photo/user/{user.key}/',
                                   {'file': tmp_file},
                                   format='multipart'
                                   )

            response = client.get(f'/api/user/{user.key}/photo/')
            self.assertEqual(response.status_code, 200)
