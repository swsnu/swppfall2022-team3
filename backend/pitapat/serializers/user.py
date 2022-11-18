from datetime import date

from rest_framework import serializers

from pitapat.constants import S3_URL
from pitapat.models import Introduction, Tag, User, UserTag


class ImageUrlField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{S3_URL}{value.name}'


class UserListSerializer(serializers.ModelSerializer):
    major = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name',
    )

    def get_repr_photo(self, obj: User):
        if not obj.photos.all():
            return ''
        return f'{S3_URL}{obj.photos.all()[0].path}'
    repr_photo = serializers.SerializerMethodField(method_name='get_repr_photo')

    class Meta:
        model = User
        fields = ['key', 'nickname', 'gender', 'birthday', 'major', 'repr_photo']


class UserCreateSerializer(serializers.ModelSerializer):
    introduction = serializers.CharField()
    tags = serializers.SlugRelatedField(
        queryset=Tag.objects.all(),
        slug_field='name',
        many=True,
    )

    def create(self, validated_data):
        tag_names = validated_data.pop('tags')
        intro = validated_data.pop('introduction')

        user: User = User.objects.create_user(**validated_data)
        Introduction.objects.create(user=user, field=intro)
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
            'tags',
        ]


class UserDetailSerializer(serializers.ModelSerializer):
    introduction = serializers.SlugRelatedField(
        read_only=True,
        slug_field='field',
    )

    tags = serializers.SlugRelatedField(
        read_only=True,
        slug_field='key',
        many=True,
    )

    photos = ImageUrlField(read_only=True, many=True)

    class Meta:
        model = User
        fields = [
            'key',
            'email',
            'phone',
            'nickname',
            'gender',
            'birthday',
            'college',
            'major',
            'introduction',
            'tags',
            'photos',
        ]
