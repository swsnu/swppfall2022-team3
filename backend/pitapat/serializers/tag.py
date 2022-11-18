from rest_framework import serializers

from pitapat.models import Tag, User, UserTag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['key', 'name', 'type']


class UserTagRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['key']


class UserTagCreateSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        queryset=Tag.objects.all(),
        slug_field='key',
        many=True,
    )

    class Meta:
        model = UserTag
        fields = ['tags']
