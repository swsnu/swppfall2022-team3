from rest_framework import serializers

from pitapat.models import Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['key', 'name', 'type']


class TagKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['key']
