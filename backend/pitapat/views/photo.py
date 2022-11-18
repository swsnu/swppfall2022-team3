from rest_framework import viewsets

from pitapat.models import Photo
from pitapat.serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class PhotoDetailViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'delete']
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = 'key'
