from django.db import models

from .custom_field.unsigned_auto_field import UnsignedAutoField
from .user import User


class Introduction(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='introduction_key')
    user = models.OneToOneField(User, models.CASCADE, db_column='user_key')
    content = models.TextField(db_column='content')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    def __str__(self):
        return f'introduction of {self.user.email}'

    class Meta:
        managed = False
        db_table = 'E_Introduction'
        verbose_name = 'Introduction'
