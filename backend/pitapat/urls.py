from django.urls import include, path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from . import views


schema_view = get_schema_view(
    openapi.Info(
        title="pitapat campus api",
        default_version="v0",
        description="두근두근 캠퍼스 백엔드 api입니다",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(name="email", email="pitapatcampus@gmail.com"),
        license=openapi.License(name="Test License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('auth/', include('dj_rest_auth.urls')),
    path('user/', views.UserViewSet.as_view({
        'get': 'list',
        'post': 'create',
    }), name='user'),
    path('user/<int:key>/', views.UserDetailViewSet.as_view({
        'get': 'retrieve',
        'put': 'partial_update',
        'delete': 'destroy',
    }), name='user_detail'),
    path('universities/', views.UniversityViewSet.as_view({
        'get': 'list',
    }), name='universities'),
    path('colleges/university/<int:university_key>/', views.CollegeViewSet.as_view({
        'get': 'retrieve',
    }), name='collegesuniv'),
    path('majors/college/<int:college_key>/', views.MajorViewSet.as_view({
        'get': 'retrieve',
    }), name='majorscollege'),
    path('photo/', views.PhotoViewSet.as_view({
        'post': 'create',
    }), name='photo'),
    path('photo/<int:key>/', views.PhotoDetailViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy',
    }), name='photo_detail'),
    path('tags/', views.TagViewSet.as_view({
        'get': 'list',
    }), name='tag'),
    path('tags/user/<int:user_key>/', views.UserTagViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'delete': 'destroy',
    }), name='user_tag'),
    path('pitapat/', views.PitapatCreateViewSet.as_view({
        'post': 'create',
    }), name='pitapat_create'),
    path('pitapat/<int:key>/', views.PitapatDeleteViewSet.as_view({
        'delete': 'destroy',
    }), name='pitapat_delete'),
    # path('pitapat/from/<int:user_key>'),
    path('pitapat/to/<int:user_key>/', views.PitapatToViewSet.as_view({
        'get': 'retrieve',
    }), name='pitapat_to'),
]
