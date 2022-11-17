from django.urls import path

from . import views

urlpatterns = [
    path('univ/', views.UniversityViewSet.as_view({'get': 'list'}), name='university'),
    path('user/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user'),
    path('photo/', views.PhotoViewSet.as_view({'post': 'create'}), name='photo'),
    path('tag/', views.TagViewSet.as_view({'get': 'list', 'post': 'create'}), name='tag'),
]
