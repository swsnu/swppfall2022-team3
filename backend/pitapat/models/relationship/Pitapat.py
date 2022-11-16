from django.db import models
from pitapat.models import User


class Pitapat(models.Model):
    from_field = models.OneToOneField(User, models.CASCADE, db_column='from', related_name='pitapat_from', primary_key=True)
    to = models.ForeignKey(User, models.CASCADE, db_column='to', related_name='pitapat_to')

    class Meta:
        managed = False
        db_table = 'R_Pitapat'
        verbose_name = 'pitapat'
        unique_together = (('from_field', 'to'),)
