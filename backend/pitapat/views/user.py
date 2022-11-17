from pitapat.models import User
from pitapat.serializers import UserCreateSerializer, UserListSerializer
from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'create':
            return UserCreateSerializer
        raise Exception()
