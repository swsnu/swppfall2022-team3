from pitapat.models import Pitapat, User, UserChatroom
from pitapat.serializers import PitaPatSerializer, UserListSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class PitaPatCreateViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = Pitapat.objects.all()

    def create(self, request):
        from_id = request.data.pop('user_from')
        to_id = request.data.pop('user_to')
        from_user = User.objects.get(key=from_id)
        to_user = User.objects.get(key=to_id)
        Pitapat.objects.create(is_from=from_user, to=to_user)
        pitapat = Pitapat.objects.get(is_from=from_user, to=to_user)
        serializer = PitaPatSerializer(pitapat)
        return Response(serializer.data)


class PitapatDeleteViewSet(viewsets.ModelViewSet):
    http_method_names = ['delete']
    queryset = Pitapat.objects.all()
    serializer_class = PitaPatSerializer
    lookup_field = 'key'


class PitapatToViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Pitapat.objects.all()

    def retrieve(self, request, user_id):
        from_users = Pitapat.objects.filter(to=User.objects.get(key=user_id))
        users = []
        for from_user in from_users:
            users.append(User.objects.get(key=from_user.is_from.key))
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
