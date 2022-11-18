from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import University, College, Major
from pitapat.serializers import UniversitySerializer, CollegeSerializer, MajorSerializer


class UniversityViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class CollegeViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

    def retrieve(self, request, university_key):
        get_object_or_404(University.objects.all(), key=university_key)
        colleges = College.objects.filter(university=university_key)
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data)


class MajorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Major.objects.all()
    serializer_class = MajorSerializer

    def retrieve(self, request, college_key):
        get_object_or_404(College.objects.all(), key=college_key)
        majors = Major.objects.filter(college=college_key)
        serializer = MajorSerializer(majors, many=True)
        return Response(serializer.data)

