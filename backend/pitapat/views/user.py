from datetime import datetime

from django.db.models import Count, Q
from django.http import HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Introduction, Photo, User, UserTag, Tag
from pitapat.serializers import UserListSerializer, UserListFilterSerializer, UserCreateSerializer, \
    UserDetailSerializer, UserTagCreateSerializer, UserTagListSerializer, UserIntroductionSerializer


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'create':
            return UserCreateSerializer

    @swagger_auto_schema(query_serializer=UserListFilterSerializer)
    def list(self, request, *args, **kwargs):
        gender = request.GET.get('gender')
        age_min = request.GET.get('age_min')
        age_max = request.GET.get('age_max')
        colleges_included = request.GET.get('colleges_included')
        colleges_excluded = request.GET.get('colleges_excluded')
        majors_included = request.GET.get('majors_included')
        majors_excluded = request.GET.get('majors_excluded')
        tags_included = request.GET.get('tags_included')
        tags_excluded = request.GET.get('tags_excluded')

        now_year = datetime.now().year
        filters = Q()

        if gender:
            filters &= Q(gender=gender)

        if age_min:
            age_min = int(age_min)
            birth_year_max = now_year - age_min + 1
            filters &= Q(birthday__year__lte=birth_year_max)

        if age_max:
            age_max = int(age_max)
            birth_year_min = now_year - age_max + 2
            filters &= Q(birthday__year__gte=birth_year_min)

        if colleges_included:
            colleges_included = [int(c) for c in colleges_included.split(',')]
            filters &= Q(college__in=colleges_included)

        if colleges_excluded:
            colleges_excluded = [int(c) for c in colleges_excluded.split(',')]
            filters &= ~Q(college__in=colleges_excluded)

        if majors_included:
            majors_included = [int(c) for c in majors_included.split(',')]
            filters &= Q(major__in=majors_included)

        if majors_excluded:
            majors_excluded = [int(c) for c in majors_excluded.split(',')]
            filters &= ~Q(major__in=majors_excluded)

        if tags_included:
            tags_included = [int(c) for c in tags_included.split(',')]
            users_with_all_required_tags = UserTag.objects.filter(tag__in=tags_included) \
                                                          .values('user') \
                                                          .annotate(cnt=Count('*')) \
                                                          .values('user', 'cnt') \
                                                          .filter(cnt=2) \
                                                          .distinct() \
                                                          .values('user')
            filters &= Q(key__in=users_with_all_required_tags)

        if tags_excluded:
            tags_excluded = [int(c) for c in tags_excluded.split(',')]
            users_with_banned_tag = UserTag.objects.filter(tag__in=tags_excluded) \
                                                   .values('user') \
                                                   .distinct() \
                                                   .values('user')
            filters &= ~Q(key__in=users_with_banned_tag)

        users = User.objects.filter(filters)

        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)


class UserDetailViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'put', 'delete']
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'key'

    def destroy(self, request, *args, **kwargs):
        key = kwargs['key']
        Introduction.objects.get(user=key).delete()
        for user_tag in UserTag.objects.filter(user=key):
            user_tag.delete()
        for photo in Photo.objects.filter(user=key):
            photo.delete()
        User.objects.get(key=key).delete()
        return Response(status=204)


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
        tag_keys = list(map(lambda x: x['key'], serializer.data))
        return Response(tag_keys)

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


class UserIntroductionViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'put']
    queryset = Introduction.objects.all()

    def retrieve(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        introduction = get_object_or_404(Introduction.objects.all(), user=user)
        return Response(introduction.content)

    @swagger_auto_schema(request_body=UserIntroductionSerializer)
    def update(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        introduction = get_object_or_404(Introduction.objects.all(), user=user)
        content = request.data['content']
        if content is None:
            return HttpResponseBadRequest()
        introduction.content = content
        introduction.save()
        return Response(introduction.content)

    @swagger_auto_schema(request_body=UserIntroductionSerializer)
    def create(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=kwargs['user_key'])
        content = request.data['content']
        if content is None or Introduction.objects.filter(user=user).count() != 0:
            return HttpResponseBadRequest()
        introduction = Introduction(user=user, content=content)
        introduction.save()
        return Response(introduction.content)
