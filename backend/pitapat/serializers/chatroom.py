from rest_framework import serializers

from pitapat.models import Chatroom


class ChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatroom
        fields = ['key']
