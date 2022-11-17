from pitapat.models import UserTag
from rest_framework import serializers


class UserTagRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTag
        fields = ['tag']
