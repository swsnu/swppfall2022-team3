from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User, UserChatroom
# from pitapat.paginations import UserListPagination
from pitapat.serializers import UserListSerializer
# from pitapat.utils.page import paginate


class PitapatToUserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer
    # pagination_class = UserListPagination

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(to=user, is_from__isnull=False)
        user_chatrooms = UserChatroom.objects.filter(user=user)
        chatroom_participants = []
        for user_chatroom in user_chatrooms:
            try:
                chatroom_participant = UserChatroom.objects.get(
                    Q(chatroom=user_chatroom.chatroom) & ~Q(user=user_chatroom.user)).user
                chatroom_participants.append(chatroom_participant)
            except:
                pass
        for chatroom_participant in chatroom_participants:
            pitapats=pitapats.exclude(is_from=chatroom_participant)
        sender_keys = [pitapat.is_from.key for pitapat in pitapats]
        sender_users = User.objects.filter(key__in=sender_keys).order_by('-reg_dt')
        return Response(self.get_serializer(sender_users, many=True).data)

class PitapatFromUserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()
    serializer_class = UserListSerializer
    # pagination_class = UserListPagination

    def list(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        pitapats = Pitapat.objects.filter(is_from=user, to__isnull=False)
        user_chatrooms = UserChatroom.objects.filter(user=user)
        chatroom_participants = []
        for user_chatroom in user_chatrooms:
            try:
                chatroom_participant = UserChatroom.objects.get(
                    Q(chatroom=user_chatroom.chatroom) & ~Q(user=user_chatroom.user)).user
                chatroom_participants.append(chatroom_participant)
            except:
                pass
        for chatroom_participant in chatroom_participants:
            pitapats=pitapats.exclude(to=chatroom_participant)
        receiver_keys = [pitapat.to.key for pitapat in pitapats]
        receiver_users = User.objects.filter(key__in=receiver_keys).order_by('-reg_dt')
        return Response(self.get_serializer(receiver_users, many=True).data)
