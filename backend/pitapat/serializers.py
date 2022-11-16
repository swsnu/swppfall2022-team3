from datetime import date

from rest_framework import serializers

from .models import User, University, College, Major, Introduction, Tag, UserTag


class UniversityListReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['key', 'name']


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
    university = serializers.CharField()
    college = serializers.CharField()
    major = serializers.CharField()
    introduction = serializers.CharField()
    tags = serializers.SlugRelatedField(
        queryset=Tag.objects.all(),
        slug_field='name',
        many=True,
    )
    # photos = serializers.

    def create(self, validated_data):
        validated_data['university'] = University.objects.get(name=validated_data['university'])
        validated_data['college'] = College.objects.get(name=validated_data['college'])
        validated_data['major'] = Major.objects.get(name=validated_data['major'])
        tag_names = validated_data.pop('tags')
        intro = validated_data.pop('introduction')

        # photo_paths = validated_data.pop('photos')
        user: User = User.objects.create_user(**validated_data)
        Introduction.objects.create(user=user, field=intro)
        # for path in photo_paths:
        #     Photo.objects.create(user=user, name='photo', path=path)
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
            # 'photos',
            'tags',
        ]
