from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Tag, User, UserTag
from pitapat.serializers import TagListSerializer, UserTagListSerializer, UserTagCreateSerializer


class TagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Tag.objects.all()
    serializer_class = TagListSerializer


class UserTagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'delete']
    queryset = Tag.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserTagListSerializer
        if self.action == 'create' or self.action == 'delete':
            return UserTagCreateSerializer

    def list(self, request, *args, **kwargs):
        user_key = kwargs['user_key']
        tags = Tag.objects.filter(user=user_key)
        serializer = UserTagListSerializer(tags, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = User.objects.get(key=kwargs['user_key'])
        tags = request.data.getlist('tags')
        for tag_key in tags:
            tag = Tag.objects.get(key=tag_key)
            UserTag.objects.create(user=user, tag=tag)
        return Response(status=201)

    @swagger_auto_schema(request_body=UserTagCreateSerializer)
    def destroy(self, request, *args, **kwargs):
        user = User.objects.get(key=kwargs['user_key'])
        tag_keys = request.data['tags']
        for tag_key in tag_keys:
            user_tag = UserTag.objects.get(user=user, tag=tag_key)
            user_tag.delete()
        return Response(status=204)
