from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import action

from pitapat.models import University, College, Major
from pitapat.serializers import UniversitySerializer, CollegeSerializer, MajorSerializer


class UniversityViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class CollegeViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = College.objects.all()
    lookup_field = 'univ_id'

    def retrieve(self, request, univ_id):
        col = College.objects.filter(university=univ_id)
        serializer = CollegeSerializer(col, many=True)
        return Response(serializer.data)


class MajorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Major.objects.all()
    lookup_field = 'col_id'

    def retrieve(self, request, col_id):
        major = Major.objects.filter(college=col_id)
        serializer = MajorSerializer(major, many=True)
        return Response(serializer.data)

