from django.db import models
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField
from pitapat.models import User


class Introduction(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='introduction_key')
    user = models.OneToOneField(User, models.CASCADE, db_column='user_key')
    field = models.TextField()
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
