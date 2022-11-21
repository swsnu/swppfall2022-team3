import binascii
from Crypto.Cipher import AES

from backend.settings import CRYPTO_KEY, CRYPTO_IV


def create_verification_code(email, request_time):
    data = pad(bytes(email + request_time, 'utf-8'))
    code = aes_encrypt(data, CRYPTO_KEY, CRYPTO_IV)
    return (code[:3] + code[-3:]).decode('utf-8')


def pad(data):
    return data + b"\x00" * (16 - len(data) % 16)


def aes_encrypt(data, key, iv):
    key = key.encode('utf-8')
    iv = iv.encode('utf-8')
    cipher = AES.new(key, AES.MODE_CBC, iv)
    encrypted = cipher.encrypt(data)
    return binascii.hexlify(encrypted)
