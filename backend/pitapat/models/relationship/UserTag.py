from django.db import models
from pitapat.models import Tag, User
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField


class UserTag(models.Model):
    key = UnsignedAutoField(
        db_column='user_tag_key',
        primary_key=True,
    )
    user = models.OneToOneField(
        User,
        on_delete=models.RESTRICT,
        db_column='user_key',
    )
    tag = models.ForeignKey(
        Tag,
        on_delete=models.RESTRICT,
        db_column='tag_key',
    )

    class Meta:
        managed = False
        db_table = 'R_UserTag'
        verbose_name = 'User-Tag Relationship'
        unique_together = (('user', 'tag'),)
