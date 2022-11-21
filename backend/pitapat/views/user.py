from datetime import datetime

from django.db.models import Count, Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Introduction, Photo, Pitapat, User, UserChatroom, UserTag
from pitapat.paginations import UserListPagination
from pitapat.serializers import (UserListSerializer, UserListFilterSerializer,
                                 UserCreateSerializer, UserDetailSerializer)
from pitapat.utils.page import paginate


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
        filters = Q()
        filters &= ~Q(key=request.user.key)
        filters &= exclude_pitapat_users(request.user)
        filters &= exclude_chatroom_users(request.user)

        gender = request.GET.get('gender')
        if gender:
            filters &= Q(gender=gender)

        age_min = request.GET.get('age_min')
        if age_min:
            age_min = int(age_min)
            filters &= Q(birthday__year__lte=datetime.now().year - age_min + 1)

        age_max = request.GET.get('age_max')
        if age_max:
            age_max = int(age_max)
            filters &= Q(birthday__year__gte=datetime.now().year - age_max + 1)

        colleges_included = request.GET.get('colleges_included')
        if colleges_included:
            colleges_included = parse_int_query_parameters(colleges_included)
            filters &= Q(college__in=colleges_included)

        colleges_excluded = request.GET.get('colleges_excluded')
        if colleges_excluded:
            colleges_excluded = parse_int_query_parameters(colleges_excluded)
            filters &= ~Q(college__in=colleges_excluded)

        majors_included = request.GET.get('majors_included')
        if majors_included:
            majors_included = parse_int_query_parameters(majors_included)
            filters &= Q(major__in=majors_included)

        majors_excluded = request.GET.get('majors_excluded')
        if majors_excluded:
            majors_excluded = parse_int_query_parameters(majors_excluded)
            filters &= ~Q(major__in=majors_excluded)

        tags_included = request.GET.get('tags_included')
        if tags_included:
            tags_included = parse_int_query_parameters(tags_included)
            filters &= Q(key__in=UserTag.objects.filter(tag__in=tags_included)
                                                .values('user')
                                                .annotate(cnt=Count('*'))
                                                .values('user', 'cnt')
                                                .filter(cnt=len(tags_included))
                                                .distinct()
                                                .values('user'))

        tags_excluded = request.GET.get('tags_excluded')
        if tags_excluded:
            tags_excluded = parse_int_query_parameters(tags_excluded)
            filters &= ~Q(key__in=UserTag.objects.filter(tag__in=tags_excluded)
                                                  .values('user')
                                                  .distinct()
                                                  .values('user'))

        return paginate(
            User.objects.filter(filters).order_by('key'),
            self.paginate_queryset,
            self.get_serializer,
            self.get_paginated_response,
        )


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


def exclude_pitapat_users(session_user):
    filters = Q()
    sended_pitapats = Pitapat.objects.filter(to=session_user, is_from__isnull=False)
    sender_keys = [pitapat.is_from.key for pitapat in sended_pitapats]
    filters &= ~Q(key__in=sender_keys)
    received_pitapats = Pitapat.objects.filter(is_from=session_user, to__isnull=False)
    receiver_keys = [pitapat.to.key for pitapat in received_pitapats]
    filters &= ~Q(key__in=receiver_keys)
    return filters

def exclude_chatroom_users(session_user):
    user_chatrooms = UserChatroom.objects.filter(user=session_user)
    chatroom_users = []
    for user_chatroom in user_chatrooms:
        chatroom_users.extend(
            [uc.user.key for uc in UserChatroom.objects.filter(
                Q(chatroom=user_chatroom.chatroom) & ~Q(user=session_user)
            )]
        )
    return ~Q(key__in=chatroom_users)

def parse_int_query_parameters(params):
    return [int(c) for c in params.split(',')]
