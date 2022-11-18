from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Tag, User, UserTag
from pitapat.serializers import UserTagRetrieveSerializer


class UserTagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'delete']
    queryset = UserTag.objects.all()
    lookup_field = 'user_key'

    def retrieve(self, request, user_key):
        user_tag = UserTag.objects.filter(user_id=user_key)
        serializer = UserTagRetrieveSerializer(user_tag, many=True)
        return Response(serializer.data)

    def create(self, request, user_key):
        user = User.objects.get(key=user_key)
        tag = request.data.pop('tag')
        UserTag.objects.create(user=user, tag=Tag.objects.get(name=tag))
        user_tag = UserTag.objects.get(user_id=user_key, tag=Tag.objects.get(name=tag))
        serializer = UserTagRetrieveSerializer(user_tag)
        return Response(serializer.data)

    def destroy(self, request, user_key):
        tag = request.data.pop('tag')
        user_tag = UserTag.objects.get(user_id=user_key, tag_id=Tag.objects.get(name=tag))
        serializer = UserTagRetrieveSerializer(user_tag)
        user_tag.delete()
        return Response(serializer.data)
