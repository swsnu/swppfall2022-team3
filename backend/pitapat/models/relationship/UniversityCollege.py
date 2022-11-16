from django.db import models
from pitapat.models import University, College


class UniversityCollege(models.Model):
    university = models.OneToOneField(University, models.RESTRICT, db_column='university_key', primary_key=True)
    college = models.ForeignKey(College, models.RESTRICT, db_column='college_key')

    class Meta:
        managed = False
        db_table = 'R_UniversityCollege'
        verbose_name = 'University-College Relationship'
        unique_together = (('university', 'college'),)
