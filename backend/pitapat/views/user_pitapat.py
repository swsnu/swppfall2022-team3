from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User
from pitapat.serializers import UserListSerializer


class PitapatToUserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(to=user, is_from__isnull=False)
        sender_keys = [pitapat.is_from.key for pitapat in pitapats]
        users = User.objects.filter(key__in=sender_keys)
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)


class PitapatFromUserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(is_from=user, to__isnull=False)
        receiver_keys = [pitapat.to.key for pitapat in pitapats]
        users = User.objects.filter(key__in=receiver_keys)
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
