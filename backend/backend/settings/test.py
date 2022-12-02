from .base import *


DEBUG = True

db = get_external_value(f'{BASE_DIR}/backend/.secrets/db.json', 'test')
DATABASES = {
    'default': {
        'ENGINE': db['ENGINE'],
        'HOST': db['HOST'],
        'PORT': db['PORT'],
        'USER': db['USER'],
        'PASSWORD': db['PASSWORD'],
        'NAME': db['NAME'],
    }
}

ALLOWED_HOSTS = get_external_value(f'{BASE_DIR}/backend/.secrets/host.json', 'test')

CORS_ORIGIN_WHITELIST = get_external_value(f'{BASE_DIR}/backend/.secrets/cors_whitelist.json', 'test')
CSRF_TRUSTED_ORIGINS = CORS_ORIGIN_WHITELIST
