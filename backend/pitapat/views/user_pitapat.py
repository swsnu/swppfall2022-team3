from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User
from pitapat.serializers import UserListSerializer


class UserPitapatSentViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(to=user)
        users = [User.objects.get(key=pitapat.is_from.key) for pitapat in pitapats if pitapat.is_from]
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)


class UserPitapatReceivedViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(is_from=user)
        users = [User.objects.get(key=pitapat.to.key) for pitapat in pitapats if pitapat.to]
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
