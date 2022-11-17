from datetime import date

from pitapat.models import Introduction, Photo, Tag, User, UserTag
from rest_framework import serializers


S3_URL = 'https://pitapatcampus.s3.ap-northeast-2.amazonaws.com/'


class ImageUrlField(serializers.RelatedField):
    def to_representation(self, obj):
        return f'{S3_URL}{obj.name}'


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

    def get_age(self, obj: User):
        return date.today().year - obj.birthday.year + 1
    age = serializers.SerializerMethodField(method_name='get_age')

    class Meta:
        model = User
        fields = ['key', 'nickname', 'gender', 'age', 'major', 'repr_photo']


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
    def get_age(self, obj: User):
        return date.today().year - obj.birthday.year + 1
    age = serializers.SerializerMethodField(method_name='get_age')

    introduction = serializers.SlugRelatedField(
        read_only=True,
        slug_field='field',
    )

    tags = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name',
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
            'age',
            'college',
            'major',
            'introduction',
            'tags',
            'photos',
        ]
