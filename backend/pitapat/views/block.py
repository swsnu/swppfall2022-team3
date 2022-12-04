from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Block, User
# from pitapat.models import Chatroom, UserChatroom
from pitapat.serializers import BlockSerializer


class BlockViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'delete']
    queryset = Block.objects.all()
    serializer_class = BlockSerializer

    def create(self, request, *args, **kwargs):
        from_key = request.data.get('from')
        to_key = request.data.get('to')
#         chatroom_key = request.data.get('chatroom')
#         if not from_key or not to_key or not chatroom_key:
#             return Response(status=400)

        from_user = get_object_or_404(User.objects.all(), key=from_key)
        to_user = get_object_or_404(User.objects.all(), key=to_key)

#         # duplicated request
#         if Block.objects.filter(is_from=from_user, to=to_user):
#             return Response(status=409)
#
#         chatroom = get_object_or_404(Chatroom.objects.all(), key=chatroom_key)
#         chatroom.delete()
#
#         try:
#             from_user_chatroom = UserChatroom.objects.get(user=from_user, chatroom=chatroom)
#             to_user_chatroom = UserChatroom.objects.get(user=to_user, chatroom=chatroom)
#         except UserChatroom.DoesNotExist:
#             return Response(status=404)
#
#         from_user_chatroom.delete()
#         to_user_chatroom.delete()

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
