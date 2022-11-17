from pitapat.models import University
from rest_framework import serializers


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['key', 'name']
