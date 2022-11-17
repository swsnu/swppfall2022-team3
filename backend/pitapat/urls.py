from django.urls import include, path

from . import views


urlpatterns = [
    path('photo/', views.PhotoViewSet.as_view({'post': 'create'}), name='photo'),
    path('tag/', views.TagViewSet.as_view({'get': 'list', 'post': 'create'}), name='tag'),
    path('univ/', views.UniversityViewSet.as_view({'get': 'list'}), name='univ'),
    path('univ/<int:univ_id>/', views.university_detail_view_set, name='univ_detail'),
    path('user/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user'),
    path('user/<int:key>/', views.UserDetailViewSet.as_view({
        'get': 'retrieve',
        'put': 'partial_update',
        'delete': 'destroy',
    }), name='user_detail'),
    path('tag/user/<int:user_id>/', views.UserTagViewSet.as_view({
        'get': 'retrieve',
        'post': 'create',
        'delete': 'destroy',
    }), name='usertag'),
    path('pitapat/', views.PitaPatCreateViewSet.as_view({'post': 'create'}), name='pitapat_create'),
    path('pitapat/<int:key>/', views.PitapatDeleteViewSet.as_view({'delete': 'destroy'}), name='pitapat_delete'),
    path('pitapat/to/<int:user_id>/', views.PitapatToViewSet.as_view({'get': 'retrieve'}), name='pitapat_to'),
    path('auth/', include('dj_rest_auth.urls')),
]
