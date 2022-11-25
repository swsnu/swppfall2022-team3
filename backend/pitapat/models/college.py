from django.db import models

from .custom_field.unsigned_auto_field import UnsignedAutoField
from .university import University


class College(models.Model):
    key = UnsignedAutoField(
        primary_key=True,
        db_column='college_key',
    )
    name = models.CharField(
        max_length=20,
        db_column='college_name',
    )
    university = models.ForeignKey(
        University,
        on_delete=models.RESTRICT,
        related_name='colleges',
        db_column='university_key',
    )
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.university} {self.name}'

    class Meta:
        managed = False
        db_table = 'E_College'
        verbose_name = 'College'
