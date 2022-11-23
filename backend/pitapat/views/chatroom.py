from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import User, UserChatroom
from pitapat.serializers import UserListSerializer


class ChatroomParticipantViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'key'

    def list(self, request, *args, **kwargs):
        chatroom_key = kwargs['chatroom_key']
        user_chatrooms = UserChatroom.objects.filter(chatroom__key=chatroom_key)
        users = [user_chatroom.user for user_chatroom in user_chatrooms]
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
