from django.urls import include, path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from . import views


schema_view = get_schema_view(
    openapi.Info(
        title='pitapat campus api',
        default_version='v0',
        description='두근두근 캠퍼스 백엔드 api입니다',
        terms_of_service='https://www.google.com/policies/terms/',
        contact=openapi.Contact(name='email', email='pitapatcampus@gmail.com'),
        license=openapi.License(name='Test License'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json',
    ),
    re_path(
        r'^swagger/$',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui',
    ),
    re_path(
        r'^redoc/$',
        schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc',
    ),
    path(
        'auth/',
        include('dj_rest_auth.urls'),
    ),
    path(
        'auth/email',
        views.AuthEmailViewSet.as_view({
            'post': 'create',
        }),
        name='auth_email'
    ),
    path(
        'auth/verify',
        views.AuthVerifyViewSet.as_view({
            'post': 'create',
        }),
        name='auth_verify'
    ),
    path(
        'user/',
        views.UserViewSet.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='user',
    ),
    path(
        'user/<int:key>/',
        views.UserDetailViewSet.as_view({
            'get': 'retrieve',
            'put': 'partial_update',
            'delete': 'destroy',
        }),
        name='user_detail',
    ),
    path(
        'user/<int:user_key>/introduction/',
        views.UserIntroductionViewSet.as_view({
            'get': 'retrieve',
            'post': 'create',
            'put': 'update',
        }),
        name='user_introduction',
    ),
    path(
        'user/<int:user_key>/tag/',
        views.UserTagViewSet.as_view({
            'get': 'list',
            'post': 'create',
            'delete': 'destroy',
        }),
        name='user_tag',
    ),
    path(
        'user/<int:user_key>/pitapat/to/',
        views.PitapatToUserViewSet.as_view({
            'get': 'list',
        }),
        name='pitapat_to_user',
    ),
    path(
        'user/<int:user_key>/pitapat/from/',
        views.PitapatFromUserViewSet.as_view({
            'get': 'list',
        }),
        name='pitapat_from_user',
    ),
    path(
        'user/<int:user_key>/chatroom/',
        views.UserChatroomViewSet.as_view({
            'get': 'list',
        }),
        name='user_chatroom'
    ),
    path(
        'user/chatroom/<int:chatroom_key>',
        views.UserChatroomParticipantViewSet.as_view({
            'get': 'list',
        }),
        name='user_chatroom_participant'
    ),
    path(
        'university/',
        views.UniversityViewSet.as_view({
            'get': 'list',
        }),
        name='university',
    ),
    path(
        'college/university/<int:university_key>/',
        views.CollegeViewSet.as_view({
            'get': 'list',
        }),
        name='college_university',
    ),
    path(
        'major/college/<int:college_key>/',
        views.MajorViewSet.as_view({
            'get': 'list',
        }),
        name='major_college',
    ),
    path(
        'photo/',
        views.PhotoViewSet.as_view({
            'post': 'create',
        }),
        name='photo',
    ),
    path(
        'photo/<int:key>/',
        views.PhotoDetailViewSet.as_view({
            'get': 'retrieve',
            'delete': 'destroy',
        }),
        name='photo_detail',
    ),
    path(
        'tag/',
        views.TagViewSet.as_view({
            'get': 'list',
        }),
        name='tag',
    ),
    path(
        'pitapat/',
        views.PitapatViewSet.as_view({
            'post': 'create',
            'delete': 'destroy',
        }),
        name='pitapat',
    ),
]
