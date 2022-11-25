from rest_framework import serializers

from pitapat.models import Tag, UserTag


class UserTagCreateSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        queryset=Tag.objects.all(),
        slug_field='key',
        many=True,
    )

    class Meta:
        model = UserTag
        fields = ['tags']
