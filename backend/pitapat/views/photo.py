from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from pitapat.models import Photo
from pitapat.serializers import PhotoSerializer, PhotoUserSerializer


class PhotoCreateViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    parser_classes = (FormParser, MultiPartParser)

    def create(self, request, *args, **kwargs):
        serializer = PhotoUserSerializer(data={
            'user': kwargs['user_key'],
            'name': request.data['file'],
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PhotoDetailViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'delete']
    queryset = Photo.objects.all()
    serializer_class = PhotoUserSerializer
    lookup_field = 'key'
