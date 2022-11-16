from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import (FileUploadParser, JSONParser,
                                    MultiPartParser)
from rest_framework.response import Response

from .models import College, Introduction, Major, University, User
from .serializers import (IntroductionCreateSerializer, PhotoCreateSerializer,
                          UniversityListReadSerializer, UserCreateSerializer,
                          UserListReadSerializer)


class BadRequestError(Exception):
    pass


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, JSONParser, FileUploadParser])
def user_view(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserListReadSerializer(users, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data

        try:
            if 'university' not in data:
                raise BadRequestError({'university': 'field does not exist'})
            if 'college' not in data:
                raise BadRequestError({'college': 'field does not exist'})
            if 'major' not in data:
                raise BadRequestError({'major': 'field does not exist'},)
            if 'introduction' not in data:
                raise BadRequestError({'introduction': 'field does not exist'})
            if 'photos' not in data:
                raise BadRequestError({'photos': 'field does not exist'})
        except BadRequestError as error:
            return Response(error, status=400)

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
            user: User = user_serializer.save()

            intro_serializer = IntroductionCreateSerializer(data={
                'user': user.key,
                'field': data['introduction'],
            })
            if not intro_serializer.is_valid():
                user.delete()
                raise BadRequestError(intro_serializer.errors)
            intro: Introduction = intro_serializer.save()

            photo_serializer = PhotoCreateSerializer(data=[{
                'user': user.key,
                'name': 'photo',    # TODO: save filename
                'path': photo,
            } for photo in data['photos']], many=True)
            if not photo_serializer.is_valid():
                intro.delete()
                user.delete()
                raise BadRequestError(photo_serializer.errors)
            photo_serializer.save()
        except BadRequestError as error:
            return Response(error, status=400)

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
