from datetime import date

from rest_framework import serializers

from .models import College, Introduction, Major, Photo, Tag, University, User


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
        fields = ['key', 'username', 'gender', 'age', 'major', 'repr_photo']


class UserCreateSerializer(serializers.ModelSerializer):
    def get_introduction(self, obj: User):
        return IntroductionCreateSerializer(user=obj.key)
    introduction = serializers.SerializerMethodField()

    def get_photos(self, obj: User):
        return PhotoCreateSerializer(user=obj.key, many=True)
    photos = serializers.SerializerMethodField()

    def get_tags(self, _obj: User):
        return Tag.objects.all()
    tags = serializers.SerializerMethodField()

    def get_university(self, obj: User):
        return University.objects.get(name=obj.university)
    university = serializers.SerializerMethodField()

    def get_college(self, obj: User):
        return College.objects.get(name=obj.college)
    college = serializers.SerializerMethodField()

    def get_major(self, obj: User):
        return Major.objects.get(name=obj.major)
    major = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'phone',
            'username',
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
