from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import (FileUploadParser, JSONParser,
                                    MultiPartParser)
from rest_framework.response import Response

from .models import College, Introduction, Major, University, User
from .serializers import (IntroductionCreateSerializer, PhotoCreateSerializer,
                          UniversityListReadSerializer, UserCreateSerializer,
                          UserListReadSerializer)


class BadRequestError(Exception):
    def __init__(self, errors):
        self.errors = errors


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, JSONParser, FileUploadParser])
def user_view(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserListReadSerializer(users, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data
        university = University.objects.get(name=data['university'])
        college = College.objects.get(name=data['college'])
        major = Major.objects.get(name=data['major'])
        data['university'] = university.key
        data['college'] = college.key
        data['major'] = major.key
        try:
            user_serializer = UserCreateSerializer(data=data)
            if not user_serializer.is_valid():
                raise BadRequestError(user_serializer.errors)
        except BadRequestError as error:
            return Response(error.errors, status=400)
        return Response({}, status=201)

    return Response({"error": "HTTP method not allowed"}, status=405)


@api_view(['GET'])
@parser_classes([MultiPartParser, JSONParser, FileUploadParser])
def university_view(request):
    if request.method == 'GET':
        universities = University.objects.all()
        serializer = UniversityListReadSerializer(universities, many=True)
        return Response(serializer.data)

    return Response({"error": "HTTP method not allowed"}, status=405)
