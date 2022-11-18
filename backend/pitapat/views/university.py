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

    def retrieve(self, request, university_key):
        try:
            University.objects.get(key=university_key)
        except University.DoesNotExist:
            return Response([], status=404)
        colleges = College.objects.filter(university=university_key)
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data)


class MajorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Major.objects.all()

    def retrieve(self, request, college_key):
        try:
            College.objects.get(key=college_key)
        except College.DoesNotExist:
            return Response([], status=404)
        majors = Major.objects.filter(college=college_key)
        serializer = MajorSerializer(majors, many=True)
        return Response(serializer.data)

