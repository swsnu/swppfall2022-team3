import os
from uuid import uuid4


def rename_image_to_uuid(_, filename):
    ext = filename.split('.')[-1]
    uuid = uuid4().hex

    return f'{uuid}.{ext}'
