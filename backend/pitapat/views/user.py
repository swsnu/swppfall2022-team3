from datetime import datetime

from django.db.models import Count, Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Chatroom, Introduction, Photo, Pitapat, User, UserChatroom, UserTag
from pitapat.paginations import UserListPagination
from pitapat.serializers import (UserListSerializer, UserListFilterSerializer,
                                 UserCreateSerializer, UserDetailSerializer)


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    queryset = User.objects.all()
    pagination_class = UserListPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        if self.action == 'create':
            return UserCreateSerializer
        return None

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

        filters = Q()

        # exclude session user
        filters &= ~Q(key=request.user.key)

        # exclude pitapat users
        sended_pitapats = Pitapat.objects.filter(to=request.user, is_from__isnull=False)
        sender_keys = [pitapat.is_from.key for pitapat in sended_pitapats]
        filters &= ~Q(key__in=sender_keys)
        received_pitapats = Pitapat.objects.filter(is_from=request.user, to__isnull=False)
        receiver_keys = [pitapat.to.key for pitapat in received_pitapats]
        filters &= ~Q(key__in=receiver_keys)

        # exclude chatroom users
        user_chatrooms = UserChatroom.objects.filter(user=request.user)
        users = []
        for user_chatroom in user_chatrooms:
            chatroom = user_chatroom.chatroom
            users.extend([uc.user.key for uc in UserChatroom.objects.filter(Q(chatroom=chatroom) & ~Q(user=request.user))])
        filters &= ~Q(key__in=users)

        if gender:
            filters &= Q(gender=gender)

        if age_min:
            age_min = int(age_min)
            birth_year_max = datetime.now().year - age_min + 1
            filters &= Q(birthday__year__lte=birth_year_max)

        if age_max:
            age_max = int(age_max)
            birth_year_min = datetime.now().year - age_max + 2
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
                                                          .filter(cnt=len(tags_included)) \
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

        users = User.objects.filter(filters).order_by('key')

        page = self.paginate_queryset(users)
        if page is not None:
            serializer = UserListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

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
