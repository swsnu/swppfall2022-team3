from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User, Chatroom, UserChatroom
from pitapat.serializers import PitapatSerializer


class PitapatViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'delete']
    queryset = Pitapat.objects.all()
    serializer_class = PitapatSerializer

    def create(self, request, *args, **kwargs):
        from_key = request.data.get('from')
        to_key = request.data.get('to')
        if not from_key or not to_key:
            return Response(status=400)

        from_user = get_object_or_404(User.objects.all(), key=from_key)
        to_user = get_object_or_404(User.objects.all(), key=to_key)

        try:
            reverse_pitapat = Pitapat.objects.get(is_from=to_user, to=from_user)
        except Pitapat.DoesNotExist:
            reverse_pitapat = None

        if reverse_pitapat:
            # create chatroom and delete reverse pitapat
            chatroom = Chatroom.objects.create(user_count=2)
            UserChatroom.objects.create(user=from_user, chatroom=chatroom)
            UserChatroom.objects.create(user=to_user, chatroom=chatroom)
            reverse_pitapat.delete()
            return Response(status=205)

        # duplicated request
        if Pitapat.objects.filter(is_from=from_user, to=to_user):
            return Response(status=409)

        Pitapat.objects.create(is_from=from_user, to=to_user)
        return Response(status=201)

    @swagger_auto_schema(request_body=PitapatSerializer)
    def destroy(self, request, *args, **kwargs):
        from_key = request.data.get('from')
        to_key = request.data.get('to')
        if not from_key or not to_key:
            return Response(status=400)

        from_user = get_object_or_404(User.objects.all(), key=from_key)
        to_user = get_object_or_404(User.objects.all(), key=to_key)

        try:
            pitapat = Pitapat.objects.get(is_from=from_user, to=to_user)
        except Pitapat.DoesNotExist:
            return Response(status=404)

        pitapat.delete()
        return Response(status=204)
