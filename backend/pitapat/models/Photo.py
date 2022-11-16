from django.db import models
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField
from pitapat.models import User


class Photo(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='photo_key')
    user = models.ForeignKey(User, models.CASCADE, related_name='photos', db_column='user_key')
    name = models.CharField(max_length=50, db_column='photo_name')
    path = models.CharField(max_length=256)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Photo'
        verbose_name = 'Photo'
