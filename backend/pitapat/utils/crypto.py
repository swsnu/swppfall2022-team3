import binascii
from Crypto.Cipher import AES

from backend.settings import CRYPTO_KEY, CRYPTO_IV


def create_verification_code(email, request_time):
    email_int = string_to_int(list(email))
    request_time_int = string_to_int(list(request_time))
    data = str(email_int*request_time_int)
    data = pad(bytes(data, 'utf-8'))
    code = aes_encrypt(data, CRYPTO_KEY, CRYPTO_IV)
    return convert(code)


def pad(data):
    return data + b"\x00" * (16 - len(data) % 16)


def string_to_int(string):
    ret = 0
    for element in string:
        ret += ord(element)
    return ret


def convert(code):
    convert_code = ''
    for i in range(0, 18, 3):
        temp = int.from_bytes(code[i:i+3], byteorder='big')%62
        temp = convert_to_chr(temp)
        convert_code += temp
    return convert_code


def convert_to_chr(num):
    if num < 10:
        num = chr(num+ord('0'))
    elif num < 36:
        num = chr(num-10+ord('a'))
    else:
        num = chr(num-36+ord('A'))
    return num


# pylint: disable=invalid-name
def aes_encrypt(data, key, iv):
    key = key.encode('utf-8')
    iv = iv.encode('utf-8')
    cipher = AES.new(key, AES.MODE_CBC, iv)
    encrypted = cipher.encrypt(data)
    return binascii.hexlify(encrypted)
