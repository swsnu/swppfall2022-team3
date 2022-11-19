from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import User, Chatroom, UserChatroom
from pitapat.serializers import UserChatroomSerializer


class UserChatroomViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = UserChatroom.objects.all()
    serializer_class = UserChatroomSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        serializer = UserChatroomSerializer(user)
        chatrooms = [chatroom for chatroom in serializer.data['chatrooms']]
        return Response(chatrooms)
