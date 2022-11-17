from django.db import models

from ..custom_field.unsigned_auto_field import UnsignedAutoField
from ..user import User


class Pitapat(models.Model):
    key = UnsignedAutoField(
        db_column='pitapat_key',
        primary_key=True,
    )
    is_from = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        db_column='from',
        related_name='pitapat_sent',
    )
    to = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        db_column='to',
        related_name='pitapat_received',
    )

    class Meta:
        managed = False
        db_table = 'R_Pitapat'
        verbose_name = 'pitapat'
