from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import Pitapat, User, Chatroom, UserChatroom
from pitapat.serializers import UserListSerializer
from django.core.mail import EmailMessage
import string, random


def email_auth_num():
    LENGTH = 8
    string_pool = string.ascii_letters + string.digits
    auth_num = ""
    for i in range(LENGTH):
        auth_num += random.choice(string_pool)
    return auth_num

class AuthViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    queryset = User.objects.all()
    serializer_class = UserListSerializer

    def create(self, request, *args, **kwargs):
        user = get_object_or_404(User.objects.all(), key=request.data.get('key'))
        if user:
            email = 'tjd3507@snu.ac.kr'
            code = email_auth_num()
            email = EmailMessage(
                '[두근두근 캠퍼스] 이메일 인증코드',
                '인증코드는 \n\n {code}입니다.',
                'pitapatcampus@gmail.com',
                to=[email],
            )
            #email.send()
            return Response(code)
