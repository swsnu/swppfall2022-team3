from django.core.mail import EmailMessage
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from pitapat.models import User
from pitapat.serializers import AuthEmailSerializer, AuthVerifySerializer
from pitapat.utils.crypto import create_verification_code


class AuthEmailViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = AuthEmailSerializer

    @swagger_auto_schema(request_body=AuthEmailSerializer)
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        request_time = request.data.get('request_time')

        if not email or not request_time:
            return Response(status=400)

        if User.objects.filter(email=email):    # email exists
            return Response(status=409)

        code = create_verification_code(email, request_time)
        mail = EmailMessage(
            '[두근두근 캠퍼스] 이메일 인증코드',
            f'인증코드는\n\n{code} 입니다.',
            to=[email],
        )
        mail.send()
        return Response(status=204)


class AuthVerifyViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = AuthVerifySerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        request_time = request.data.get('request_time')
        user_code = request.data.get('code')

        if not email or not request_time or not user_code:
            return Response(status=400)

        code = create_verification_code(email, request_time)
        if user_code == code:
            return Response(status=204)

        return Response(status=401)
