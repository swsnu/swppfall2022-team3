import io
import tempfile
from django.test import TestCase, Client
from PIL import Image
from pitapat.testutils.setup import setup
from ..models import User, Photo


class PhotoTestCase(TestCase):
    def setUp(self):
        setup()

    def test_photo(self):
        client = Client()
        user = User.objects.get(nickname='a')
        data = {'name': 'this is a name', 'age': 12}
        data['file'] = (io.BytesIO(b"abcdef"), 'test.jpg')

        response = client.post(f'/api/photo/user/{user.key}/',
                              {'file': None},
                              content_type='multipart/form-data'
                              )
        self.assertEqual(response.status_code, 400)

        image = Image.new('RGB', (100, 100))
        with tempfile.NamedTemporaryFile(suffix='.jpg') as file:
            tmp_file = file
            image.save(tmp_file)
            tmp_file.seek(0)
            response = client.post(f'/api/photo/user/{user.key}/',
                                   {'file': tmp_file},
                                   format='multipart'
                                   )
            self.assertEqual(response.status_code, 201)
            self.assertEqual(str(Photo.objects.get(user=user)),
                             f'/{Photo.objects.get(user=user).name}'
                             )
