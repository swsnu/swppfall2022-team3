from rest_framework import serializers

from pitapat.models import Photo, User


class PhotoSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='key',
    )

    class Meta:
        model = Photo
        fields = ['user', 'name']
