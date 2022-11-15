from datetime import date

from rest_framework import serializers

from .models import *


class UserListReadSerializer(serializers.ModelSerializer):
    major = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name',
    )
    def get_repr_photo(self, obj: User):
        return obj.photos.all()[0].path
    repr_photo = serializers.SerializerMethodField(method_name='get_repr_photo')

    def get_age(self, obj: User):
        return date.today().year - obj.birthday.year + 1
    age = serializers.SerializerMethodField(method_name='get_age')

    class Meta:
        model = User
        fields = ['key', 'username', 'gender', 'age', 'major', 'repr_photo']

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'phone', 'username', 'gender', 'interested_gender', 'birthday', 'university', 'college', 'major']


class IntroductionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Introduction
        fields = ['user', 'field']


class PhotoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['user', 'name', 'path']


class UniversityListReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['key', 'name']
