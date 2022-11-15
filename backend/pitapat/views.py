from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, JSONParser, FileUploadParser
from rest_framework.response import Response

from .models import User
from .serializers import *


@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, JSONParser, FileUploadParser])
def user(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserListReadSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data

        if 'university' not in data:
            return Response({'university': 'field does not exist'}, status=400)
        if 'college' not in data:
            return Response({'college': 'field does not exist'}, status=400)
        if 'major' not in data:
            return Response({'major': 'field does not exist'}, status=400)
        if 'introduction' not in data:
            return Response({'introduction': 'field does not exist'}, status=400)
        if 'photos' not in data:
            return Response({'photos': 'field does not exist'}, status=400)

        university = University.objects.get(name=data['university'])
        college = College.objects.get(name=data['college'])
        major = Major.objects.get(name=data['major'])
        data['university'] = university.key
        data['college'] = college.key
        data['major'] = major.key

        user_serializer = UserCreateSerializer(data=data)
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=400)
        user: User = user_serializer.save()

        intro_serializer = IntroductionCreateSerializer(data={
            'user': user.key,
            'field': data['introduction'],
        })
        if not intro_serializer.is_valid():
            user.delete()
            return Response(intro_serializer.errors, status=400)
        intro: Introduction = intro_serializer.save()

        photo_serializer = PhotoCreateSerializer(data=[{
            'user': user.key,
            'name': 'photo',    # TODO: save filename
            'path': photo,
        } for photo in data['photos']], many=True)
        if not photo_serializer.is_valid():
            intro.delete()
            user.delete()
            return Response(photo_serializer.errors, status=400)
        photo_serializer.save()

        return Response({}, status=201)
