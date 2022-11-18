from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Tag, User, UserTag
from pitapat.serializers import TagSerializer, UserTagRetrieveSerializer, UserTagCreateSerializer



class TagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UserTagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'delete']
    queryset = Tag.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'delete':
            return UserTagRetrieveSerializer
        if self.action == 'create':
            return UserTagCreateSerializer

    def retrieve(self, request, *args, **kwargs):
        user_key = kwargs['user_key']
        tags = Tag.objects.filter(user=user_key)
        serializer = UserTagRetrieveSerializer(tags, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = User.objects.get(key=kwargs['user_key'])
        tags = request.data.getlist('tags')
        for tag_key in tags:
            tag = Tag.objects.get(key=tag_key)
            UserTag.objects.create(user=user, tag=tag)
        return Response(status=201)

    def destroy(self, request, *args, **kwargs):
        pass
