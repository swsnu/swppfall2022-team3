from datetime import date

from rest_framework import serializers

from .models import Introduction, Photo, Tag, University, User, UserTag


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


class TagReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        Fields = ['name', 'type']


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
        fields = ['key', 'nickname', 'gender', 'age', 'major', 'repr_photo']


class UserCreateSerializer(serializers.ModelSerializer):
    def get_introduction(self, obj: User):
        return IntroductionCreateSerializer(user=obj.key)
    introduction = serializers.SerializerMethodField()

    def get_photos(self, obj: User):
        return PhotoCreateSerializer(user=obj.key, many=True)
    photos = serializers.SerializerMethodField()

    tags = serializers.SlugRelatedField(
        queryset=Tag.objects.all(),
        many=True,
        slug_field='name',
    )

    def create(self, validated_data):
        tag_names = validated_data.pop('tags')
        user: User = User.objects.create(**validated_data)
        for name in tag_names:
            UserTag.objects.create(user=user, tag=Tag.objects.get(name=name))
        return user

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'phone',
            'nickname',
            'gender',
            'interested_gender',
            'birthday',
            'university',
            'college',
            'major',
            'introduction',
            'photos',
            'tags',
        ]
