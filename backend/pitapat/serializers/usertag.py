from pitapat.models import Tag, UserTag, User
from rest_framework import serializers


class UserTagRetrieveSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = UserTag
        fields = ['tag']
        
