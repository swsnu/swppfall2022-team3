from rest_framework import serializers

from .models import User

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'user_key',
            'username',
            'gender',
            'birth_year',
            'location',
            # 'college',
            # 'major',
        ]

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'username',
            'gender',
            'birth_year',
            'location',
            # 'university',
            # 'college',
            # 'major',
            # 'introduction',
            # 'tags'
        ]
