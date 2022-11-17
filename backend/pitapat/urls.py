from django.urls import path

from . import views


urlpatterns = [
    path('photo/', views.PhotoViewSet.as_view({'post': 'create'}), name='photo'),
    path('tag/', views.TagViewSet.as_view({'get': 'list', 'post': 'create'}), name='tag'),
    path('univ/', views.UniversityViewSet.as_view({'get': 'list'}), name='university'),
    path('univ/<int:univ_key>/', views.UniversityDetailViewSet, name='university_detail'),
    path('user/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user'),
]
