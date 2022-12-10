from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import User, Photo
from pitapat.serializers import UserPhotoSerializer


class UserPhotoViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Photo.objects.all()
    #serializer_class = ChatroomSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        photos = Photo.objects.filter(user=user)
        serializer = UserPhotoSerializer(photos, many=True)
        return Response(serializer.data)
