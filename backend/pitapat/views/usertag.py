from pitapat.models import Tag, User, UserTag
from pitapat.serializers import UserTagRetrieveSerializer
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response


class UserTagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'delete']
    queryset = UserTag.objects.all()
    lookup_field = 'user_id'
    
    
    def retrieve(self, request, user_id):
        usertag = UserTag.objects.filter(user_id = user_id)
        serializer = UserTagRetrieveSerializer(usertag, many=True)
        return Response(serializer.data)
    
    def create(self, request, user_id):
        user = User.objects.get(key = user_id)
        tags = request.data.pop('tag')
        for tag in tags:
            UserTag.objects.create(user=user, tag=Tag.objects.get(key=tag))
        usertag = UserTag.objects.filter(user_id = user_id)
        serializer = UserTagRetrieveSerializer(usertag, many=True)
        return Response(serializer.data)
      
    def destroy(self, request, user_id):
        usertag = UserTag.objects.filter(user_id = user_id)
        serializer = UserTagRetrieveSerializer(usertag, many=True)
        usertag.delete()
        return Response(serializer.data)