from rest_framework import serializers

from pitapat.models import UserTag


class UserTagRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTag
        fields = ['tag']
