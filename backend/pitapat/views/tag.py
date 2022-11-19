from rest_framework import viewsets

from pitapat.models import Tag
from pitapat.serializers import TagListSerializer


class TagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Tag.objects.all()
    serializer_class = TagListSerializer
