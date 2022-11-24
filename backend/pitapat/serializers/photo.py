from rest_framework import serializers

from pitapat.models import Photo, User


class PhotoSerializer(serializers.ModelSerializer):
    name = serializers.ImageField(use_url=True)

    class Meta:
        model = Photo
        fields = ['name']


class PhotoUserSerializer(PhotoSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='key',
    )

    class Meta:
        model = Photo
        fields = ['user', 'name']
