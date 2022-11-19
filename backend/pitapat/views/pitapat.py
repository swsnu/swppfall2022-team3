from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User, Chatroom, UserChatroom
from pitapat.serializers import PitapatSerializer, UserListSerializer


class PitapatCreateViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Pitapat.objects.all()
    serializer_class = PitapatSerializer

    def create(self, request, *args, **kwargs):
        from_user = get_object_or_404(User.objects.all(), key=request.data.get('is_from'))
        to_user = get_object_or_404(User.objects.all(), key=request.data.get('to'))
        pitapat = Pitapat.objects.create(is_from=from_user, to=to_user)
        serializer = PitapatSerializer(pitapat)
        return Response(serializer.data)


class PitapatViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'delete']
    queryset = Pitapat.objects.all()
    serializer_class = PitapatSerializer
    lookup_field = 'key'

    def create(self, request, *args, **kwargs):
        pitapat = get_object_or_404(Pitapat.objects.all(), key=kwargs['key'])
        from_user = pitapat.is_from
        to_user = pitapat.to
        chatroom = Chatroom.objects.create(user_count=2)
        UserChatroom.objects.create(user=from_user, chatroom=chatroom)
        UserChatroom.objects.create(user=to_user, chatroom=chatroom)
        return self.destroy(request)


class PitapatToViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer

    def retrieve(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(to=user)
        users = [User.objects.get(key=pitapat.is_from.key) for pitapat in pitapats if pitapat.is_from]
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)


class PitapatFromViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer

    def retrieve(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(is_from=user)
        users = [User.objects.get(key=pitapat.to.key) for pitapat in pitapats if pitapat.to]
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
