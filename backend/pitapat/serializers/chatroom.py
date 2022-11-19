from rest_framework import serializers

from pitapat.models import User


class UserChatroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['chatrooms']
