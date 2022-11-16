from django.db import models
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField


class Tag(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='tag_key')
    name = models.CharField(max_length=20, db_column='tag_name')
    type = models.CharField(max_length=20, db_column='tag_type')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Tag'
        verbose_name = 'Tag'
