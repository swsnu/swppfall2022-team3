from rest_framework import serializers

from pitapat.models import Tag, UserTag


class TagListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['key', 'name', 'type']
