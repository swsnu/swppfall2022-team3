from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Block, User, Chatroom, UserChatroom
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

        # duplicated request
        if Block.objects.filter(is_from=from_user, to=to_user):
            return Response(status=409)

        from_user_chatroom_key = [user_chat_room.chatroom.key for user_chat_room in UserChatroom.objects.filter(user=from_user)]
        to_user_chatroom_key = [user_chat_room.chatroom.key for user_chat_room in UserChatroom.objects.filter(user=to_user)]

        chatroom_key = [chatroom_key for chatroom_key in to_user_chatroom_key if chatroom_key in from_user_chatroom_key]
        if not chatroom_key:
            return Response(status=409)

        chatroom = Chatroom.objects.get(key=chatroom_key[0])
        if not chatroom:
            return Response(status=409)

        chatroom.delete()

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
        chatroom = Chatroom.objects.create(user_count=2)
        UserChatroom.objects.create(user=from_user, chatroom=chatroom)
        UserChatroom.objects.create(user=to_user, chatroom=chatroom)
        return Response(status=204)
