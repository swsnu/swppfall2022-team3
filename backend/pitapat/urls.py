from django.urls import path

from . import views

urlpatterns = [
    path('user/', views.UserViewSet.as_view({'get': 'list', 'post': 'create'}), name='user'),
    path('univ/', views.university_view, name='university'),
    path('photo/', views.PhotoCreateViewSet.as_view({'post': 'create'}), name='photo')
]
