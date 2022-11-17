from pitapat.models import User
from pitapat.serializers import UserCreateSerializer, UserListSerializer, UserDetailSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'create':
            return UserCreateSerializer
        raise Exception()


class UserDetailViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'key'
