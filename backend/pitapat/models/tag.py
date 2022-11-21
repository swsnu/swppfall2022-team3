# pylint: disable=duplicate-code
from django.db import models

from .custom_field.unsigned_auto_field import UnsignedAutoField


class Tag(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='tag_key')
    name = models.CharField(max_length=20, db_column='tag_name')
    type = models.CharField(max_length=20, db_column='tag_type')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'E_Tag'
        verbose_name = 'Tag'
