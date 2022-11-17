from pitapat.models import University
from pitapat.serializers import UniversitySerializer
from rest_framework import viewsets


class UniversityViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
