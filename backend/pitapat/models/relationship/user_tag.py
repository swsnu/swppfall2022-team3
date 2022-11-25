from django.db import models

from ..custom_field.unsigned_auto_field import UnsignedAutoField
from ..tag import Tag
from ..user import User


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

    def __str__(self):
        return f'user {self.user.key} - tag {self.tag.key}'

    class Meta:
        managed = False
        db_table = 'R_UserTag'
        verbose_name = 'User-Tag Relationship'
        unique_together = (('user', 'tag'),)
