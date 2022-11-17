from rest_framework import viewsets

from pitapat.models import Photo
from pitapat.serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
