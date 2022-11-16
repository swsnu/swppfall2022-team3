from django.db import models
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField


class College(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='college_key')
    name = models.CharField(max_length=20, db_column='college_name')
    majors = models.ManyToManyField('Major', through='CollegeMajor', through_fields=('college', 'major'))
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'E_College'
        verbose_name = 'College'
