from django.db import models

from pitapat.models.custom_field.unsigned_auto_field import UnsignedAutoField
from pitapat.models.user import User


class Block(models.Model):
    key = UnsignedAutoField(
        db_column='block_key',
        primary_key=True,
    )
    is_from = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        db_column='from',
        related_name='block_sent',
    )
    to = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        db_column='to',
        related_name='block_received',
    )

    class Meta:
        managed = False
        db_table = 'R_Block'
        verbose_name = 'block'
