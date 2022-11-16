from django.db import models
from pitapat.models import University, College
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField


class UniversityCollege(models.Model):
    key = UnsignedAutoField(
        db_column='university_college_key',
        primary_key=True,
    )
    university = models.ForeignKey(
        University,
        on_delete=models.RESTRICT,
        db_column='university_key',
    )
    college = models.ForeignKey(
        College,
        on_delete=models.RESTRICT,
        db_column='college_key',
    )

    class Meta:
        managed = False
        db_table = 'R_UniversityCollege'
        verbose_name = 'University-College Relationship'
        unique_together = (('university', 'college'),)
