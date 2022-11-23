from rest_framework import serializers

from backend.settings import IMAGE_URL
from pitapat.models import Introduction, Tag, User, UserTag


class ImageUrlField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{IMAGE_URL}{value.name}'

    def to_internal_value(self, data):
        pass


class UserListSerializer(serializers.ModelSerializer):
    major = serializers.SlugRelatedField(
        read_only=True,
        slug_field='key',
    )

    def get_repr_photo(self, obj: User):
        if not obj.photos.all():
            return ''
        return f'{IMAGE_URL}{obj.photos.all()[0].name}'
    repr_photo = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'key',
            'nickname',
            'gender',
            'birthday',
            'college',
            'major',
            'repr_photo',
            'tags',
        ]


class UserListFilterSerializer(serializers.Serializer):
    gender = serializers.ChoiceField(choices=('M', 'F'), required=False)
    age_min = serializers.IntegerField(required=False)
    age_max = serializers.IntegerField(required=False)
    colleges_included = serializers.ListField(child=serializers.IntegerField(), required=False)
    colleges_excluded = serializers.ListField(child=serializers.IntegerField(), required=False)
    majors_included = serializers.ListField(child=serializers.IntegerField(), required=False)
    majors_excluded = serializers.ListField(child=serializers.IntegerField(), required=False)
    tags_included = serializers.ListField(child=serializers.IntegerField(), required=False)
    tags_excluded = serializers.ListField(child=serializers.IntegerField(), required=False)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class UserCreateSerializer(serializers.ModelSerializer):
    introduction = serializers.CharField()
    tags = serializers.SlugRelatedField(
        queryset=Tag.objects.all(),
        slug_field='key',
        many=True,
    )

    def create(self, validated_data):
        tags = validated_data.pop('tags')
        intro = validated_data.pop('introduction')

        user: User = User.objects.create_user(**validated_data)
        Introduction.objects.create(user=user, content=intro)
        for tag_key in tags:
            tag = Tag.objects.get(key=tag_key)
            UserTag.objects.create(user=user, tag=tag)
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
        slug_field='content',
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
            'interested_gender',
            'birthday',
            'university',
            'college',
            'major',
            'introduction',
            'tags',
            'photos',
        ]
