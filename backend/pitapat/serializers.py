from datetime import date

from rest_framework import serializers

from .models import University, User, UserTag, Introduction, Photo, Tag


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['key', 'name']


class UserListReadSerializer(serializers.ModelSerializer):
    major = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name',
    )

    def get_repr_photo(self, obj: User):
        if not obj.photos.all():
            return ''
        return obj.photos.all()[0].path
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


class PhotoSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='key',
    )

    class Meta:
        model = Photo
        fields = ['user', 'name']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'type']
