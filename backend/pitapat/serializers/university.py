from pitapat.models import University, Major, College
from rest_framework import serializers


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['key', 'name']


class CollegeSerializer(serializers.ModelSerializer):
    majors = serializers.SlugRelatedField(
        queryset=Major.objects.all(),
        slug_field='name',
        many=True,
    )
    class Meta:
        model = College
        fields = ['name', 'majors']


class UniversityDetailSerializer(serializers.ModelSerializer):
    colleges = CollegeSerializer(many=True, allow_null=True)
    class Meta:
        model = University
        fields = ['key', 'colleges']
