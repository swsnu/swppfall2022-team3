from django.db.models import Q
from rest_framework import serializers

from pitapat.models import Chatroom, User, UserChatroom


class UserChatroomSerializer(serializers.ModelSerializer):
    chatroom = serializers.SlugRelatedField(
        queryset=Chatroom.objects.all(),
        slug_field='key',
    )

    def get_name(self, user_chatroom: UserChatroom):
        chatroom = user_chatroom.chatroom
        user = UserChatroom.objects.get(Q(chatroom=chatroom) & ~Q(user=user_chatroom.user)).user
        return user.nickname
    name = serializers.SerializerMethodField()

    def get_image_path(self, user_chatroom: UserChatroom):
        chatroom = user_chatroom.chatroom
        user = UserChatroom.objects.get(Q(chatroom=chatroom) & ~Q(user=user_chatroom.user)).user
        return user.photos.all()[0].name if user.photos.all() else ''
    image_path = serializers.SerializerMethodField()

    class Meta:
        model = UserChatroom
        fields = ['chatroom', 'name', 'image_path']
