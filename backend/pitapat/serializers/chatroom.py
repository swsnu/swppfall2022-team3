from django.db.models import Q
from rest_framework import serializers

from backend.settings import IMAGE_URL
from pitapat.models import Chatroom, Chat, UserChatroom


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
        return f'{IMAGE_URL}{user.photos.all()[0].name}' if user.photos.all() else ''
    image_path = serializers.SerializerMethodField()

    def get_last_chat(self, user_chatroom: UserChatroom):
        chatroom = user_chatroom.chatroom
        chats = chatroom.chats.all()
        if not chats:
            return ''
        return chats.order_by('-reg_dt')[0].content
    last_chat = serializers.SerializerMethodField()

    class Meta:
        model = UserChatroom
        fields = ['chatroom', 'name', 'image_path', 'last_chat']
