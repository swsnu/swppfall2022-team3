from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Block, User, Chatroom, UserChatroom, Pitapat
from pitapat.serializers import BlockSerializer


class BlockViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'delete']
    queryset = Block.objects.all()
    serializer_class = BlockSerializer

    def create(self, request, *args, **kwargs):
        from_key = request.data.get('from')
        to_key = request.data.get('to')
        if not from_key or not to_key:
            return Response(status=400)

        from_user = get_object_or_404(User.objects.all(), key=from_key)
        to_user = get_object_or_404(User.objects.all(), key=to_key)

        if Block.objects.filter(is_from=from_user, to=to_user): # duplicated request
            return Response(status=409)

        from_user_chatrooms = UserChatroom.objects.filter(user=from_user).values('chatroom')
        to_user_chatrooms = UserChatroom.objects.filter(user=to_user).values('chatroom')
        chatroom_keys = [key['chatroom'] for key in from_user_chatrooms if key in to_user_chatrooms]
        for chatroom_key in chatroom_keys:
            chatroom = Chatroom.objects.get(key=chatroom_key)
            if chatroom.user_count == 2:  # 1:1 chatroom
                chatroom.delete()

        try:
            reverse_pitapat = Pitapat.objects.get(is_from=from_user, to=to_user)
            reverse_pitapat.delete()
        except Pitapat.DoesNotExist:
            pass

        try:
            pitapat = Pitapat.objects.get(is_from=to_user, to=from_user)
            pitapat.delete()
        except Pitapat.DoesNotExist:
            pass

        Block.objects.create(is_from=from_user, to=to_user)

        return Response(status=201)

    @swagger_auto_schema(request_body=BlockSerializer)
    def destroy(self, request, *args, **kwargs):
        from_key = request.data.get('from')
        to_key = request.data.get('to')
        if not from_key or not to_key:
            return Response(status=400)

        from_user = get_object_or_404(User.objects.all(), key=from_key)
        to_user = get_object_or_404(User.objects.all(), key=to_key)

        try:
            block = Block.objects.get(is_from=from_user, to=to_user)
        except Block.DoesNotExist:
            return Response(status=404)
        block.delete()

        return Response(status=204)
