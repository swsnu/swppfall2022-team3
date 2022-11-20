import binascii
from Crypto.Cipher import AES
from django.core.mail import EmailMessage
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from pathlib import Path
from rest_framework import viewsets

from backend.settings import get_external_value
from pitapat.models import User
from pitapat.serializers import AuthEmailSerializer, AuthVerifySerializer


BASE_DIR = Path(__file__).resolve().parent.parent.parent
crypto_key = get_external_value(BASE_DIR / 'backend/.secrets/aes.json', 'key')
crypto_iv = get_external_value(BASE_DIR / 'backend/.secrets/aes.json', 'iv')


def pad(data):
    return data + b"\x00" * (16 - len(data) % 16)


def aes_encrypt(data, key, iv):
    key = key.encode('utf-8')
    iv = iv.encode('utf-8')
    cipher = AES.new(key, AES.MODE_CBC, iv)
    encrypted = cipher.encrypt(data)
    encrypted_hex = binascii.hexlify(encrypted)
    return encrypted_hex


class AuthEmailViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = AuthEmailSerializer

    @swagger_auto_schema(request_body=AuthEmailSerializer)
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = User.objects.filter(email=email)
        if user:
            return HttpResponse(status=409)
        request_time = request.data.get('request_time')
        data = bytes(email + request_time, 'utf-8')
        data = pad(data)
        code = aes_encrypt(data, crypto_key, crypto_iv)
        code = (code[:3] + code[-3:]).decode('utf-8')
        mail = EmailMessage(
            '[두근두근 캠퍼스] 이메일 인증코드',
            f'인증코드는\n\n{code} 입니다.',
            to=[email],
        )
        mail.send()
        return HttpResponse(status=204)


class AuthVerifyViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = AuthVerifySerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        request_time = request.data.get('request_time')
        user_code = request.data.get('code')
        data = bytes(email + request_time, 'utf-8')
        data = pad(data)
        code = aes_encrypt(data, crypto_key, crypto_iv)
        code = (code[:3] + code[-3:]).decode('utf-8')
        if user_code == code:
            return HttpResponse(status=204)
        return HttpResponse(status=401)
