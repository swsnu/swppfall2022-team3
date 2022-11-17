from django.urls import include, path

from . import views


urlpatterns = [
    path('photo/', views.PhotoViewSet.as_view({'post': 'create'}), name='photo'),
    path('tag/', views.TagViewSet.as_view({'get': 'list', 'post': 'create'}), name='tag'),
    path('univ/', views.UniversityViewSet.as_view({'get': 'list'}), name='univ'),
    path('univ/<int:univ_id>/', views.university_detail_view_set, name='univ_detail'),
    path('user/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user'),
    path('user/<int:key>/', views.UserDetailViewSet.as_view({'get': 'retrieve'}), name='user_detail'),
    path('tag/user/<int:user_id>/', views.UserTagViewSet.as_view({'get': 'retrieve', 'post': 'create', 'delete': 'destroy'}), name='usertag'),
    path('', include('dj_rest_auth.urls')),
]
