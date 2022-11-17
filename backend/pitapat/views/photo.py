from pitapat.models import Photo
from pitapat.serializers import PhotoSerializer
from rest_framework import viewsets


class PhotoViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
