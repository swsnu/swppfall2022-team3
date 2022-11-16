from django.db import models
from pitapat.models import College, Major


class CollegeMajor(models.Model):
    college = models.OneToOneField(College, models.RESTRICT, db_column='college_key', primary_key=True)
    major = models.ForeignKey(Major, models.RESTRICT, db_column='major_key')

    class Meta:
        managed = False
        db_table = 'R_CollegeMajor'
        verbose_name = 'College-Major Relationship'
        unique_together = (('college', 'major'),)
