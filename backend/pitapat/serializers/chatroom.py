from rest_framework import serializers

from pitapat.models import Chatroom


class UserChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatroom
        fields = ['key']
