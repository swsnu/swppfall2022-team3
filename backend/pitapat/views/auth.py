from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from Crypto.Cipher import AES
from pathlib import Path
import binascii

from pitapat.models import User
from django.core.mail import EmailMessage
from backend.settings import get_external_value


BASE_DIR = Path(__file__).resolve().parent.parent.parent
key = get_external_value(BASE_DIR / 'backend/.secrets/aes.json', 'key')
iv = get_external_value(BASE_DIR / 'backend/.secrets/aes.json', 'iv')

def pad(data):
    return data + b"\x00" * (16 - len(data) % 16)

def aes_encrypt(data, key, iv):
    key = key.encode('utf-8')
    iv = iv.encode('utf-8')
    cipher = AES.new(key, AES.MODE_CBC, iv)
    encrypted = cipher.encrypt(data)
    encrypted_hex = binascii.hexlify(encrypted)
    return encrypted_hex

class AuthViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = User.objects.filter(email=email)
        if user:
            return HttpResponse(status=409)
        request_time = request.data.get('request_time')
        data = bytes(email+request_time, 'utf-8')
        data = pad(data)
        code = aes_encrypt(data, key, iv)
        code = (code[:3] + code[-3:]).decode('utf-8')
        mail = EmailMessage(
            '[두근두근 캠퍼스] 이메일 인증코드',
            f'인증코드는 \n\n {code} 입니다.',
            to=[email],
        )
        mail.send()
        return HttpResponse(status=204)

class AuthVerifyViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        request_time = request.data.get('request_time')
        user_code = request.data.get('code')
        data = bytes(email+request_time, 'utf-8')
        data = pad(data)
        code = aes_encrypt(data, key, iv)
        code = (code[:3] + code[-3:]).decode('utf-8')
        if user_code == code:
            return HttpResponse(status=204)
        return HttpResponse(status=401)
