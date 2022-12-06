from rest_framework import serializers

from pitapat.models import Photo


class UserPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['key', 'name']
