from rest_framework import serializers

from pitapat.models import University, Major, College


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['key', 'name', 'email_domain']


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['key', 'name']


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ['key', 'name', 'college']
