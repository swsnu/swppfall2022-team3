from django.urls import path

from . import views

urlpatterns = [
    path('user/', views.user_view, name='user'),
    path('university/', views.university_view, name='university'),
]
