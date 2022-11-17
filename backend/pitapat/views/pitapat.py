from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User, UserChatroom
from pitapat.serializers import PitapatSerializer, UserListSerializer


class PitapatCreateViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Pitapat.objects.all()
    serializer_class = PitapatSerializer

    def create(self, request, *args, **kwargs):
        from_user = User.objects.get(key=request.data['is_from'])
        to_user = User.objects.get(key=request.data['to'])
        pitapat = Pitapat.objects.create(is_from=from_user, to=to_user)
        serializer = PitapatSerializer(pitapat)
        return Response(serializer.data)


class PitapatDeleteViewSet(viewsets.ModelViewSet):
    http_method_names = ['delete']
    queryset = Pitapat.objects.all()
    serializer_class = PitapatSerializer
    lookup_field = 'key'


class PitapatToViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()

    def retrieve(self, request, *args, **kwargs):
        pitapats = Pitapat.objects.filter(to=User.objects.get(key=kwargs['user_key']))
        users = [User.objects.get(key=pitapat.is_from.key) for pitapat in pitapats if pitapat.is_from]
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
