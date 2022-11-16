from django.db import models
from pitapat.models import Tag, User


class UserTag(models.Model):
    user = models.OneToOneField(User, models.RESTRICT, db_column='user_key', primary_key=True)
    tag = models.ForeignKey(Tag, models.RESTRICT, db_column='tag_key')

    class Meta:
        managed = False
        db_table = 'R_UserTag'
        verbose_name = 'User-Tag Relationship'
        unique_together = (('user', 'tag'),)
