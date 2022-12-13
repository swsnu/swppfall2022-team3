from django.db import models

from .custom_field.unsigned_auto_field import UnsignedAutoField
from .user import User
from ..utils.photo_uuid import rename_image_to_uuid


class Photo(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='photo_key')
    user = models.ForeignKey(User, models.CASCADE, related_name='photos', db_column='user_key')
    name = models.ImageField(max_length=50, db_column='photo_name', upload_to=rename_image_to_uuid)
    path = models.CharField(max_length=256) # unused?
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.path}/{self.name}'

    class Meta:
        managed = False
        db_table = 'E_Photo'
        verbose_name = 'Photo'
