from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import User, UserChatroom
from pitapat.serializers import ChatroomSerializer


class UserChatroomViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = UserChatroom.objects.all()
    serializer_class = ChatroomSerializer

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        user_chatrooms = UserChatroom.objects.filter(user=user)
        serializer = ChatroomSerializer(user_chatrooms, many=True)
        return Response(serializer.data)
