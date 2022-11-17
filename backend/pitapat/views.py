from .models import University, User, Tag, Photo
from .serializers import (UniversitySerializer, UserCreateSerializer,
                          UserListReadSerializer, TagSerializer, PhotoSerializer)
from rest_framework.viewsets import ModelViewSet


class UniversityViewSet(ModelViewSet):
    http_method_names = ['get']
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class UserViewSet(ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListReadSerializer
        if self.action == 'create':
            return UserCreateSerializer
        raise Exception()


class PhotoViewSet(ModelViewSet):
    http_method_names = ['post']
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class TagViewSet(ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
