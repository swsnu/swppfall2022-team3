from django.db import models
from pitapat.models import College, Major
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField


class CollegeMajor(models.Model):
    key = UnsignedAutoField(
        db_column='college_major_key',
        primary_key=True,
    )
    college = models.ForeignKey(
        College,
        on_delete=models.RESTRICT,
        db_column='college_key',
    )
    major = models.ForeignKey(
        Major,
        on_delete=models.RESTRICT,
        db_column='major_key',
    )

    class Meta:
        managed = False
        db_table = 'R_CollegeMajor'
        verbose_name = 'College-Major Relationship'
        unique_together = (('college', 'major'),)
