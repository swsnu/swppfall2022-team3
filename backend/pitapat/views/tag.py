from pitapat.models import Tag
from pitapat.serializers import TagSerializer
from rest_framework import viewsets


class TagViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
