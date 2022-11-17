from pitapat.models import University
from pitapat.serializers import UniversitySerializer, UniversityDetailSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import (FileUploadParser, JSONParser,
                                    MultiPartParser)
from rest_framework.response import Response



class UniversityViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = University.objects.all()
    serializer_class = UniversitySerializer



@api_view(['GET'])
def university_detail_view_set(request, univ_id):
    if request.method == 'GET':
        university = University.objects.get(key=univ_id)
        serializer = UniversityDetailSerializer(university, many=False)
        return Response(serializer.data)

    return Response({"error": "HTTP method not allowed"}, status=405)
