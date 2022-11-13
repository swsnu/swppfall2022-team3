# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ECollege(models.Model):
    college_key = models.BigAutoField(primary_key=True)
    college_name = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_College'


class EIntroduction(models.Model):
    introduction_key = models.BigAutoField(primary_key=True)
    user_key = models.ForeignKey('EUser', models.DO_NOTHING, db_column='user_key')
    field = models.TextField(db_column='Field')  # Field name made lowercase.
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Introduction'


class EMajor(models.Model):
    major_key = models.BigAutoField(primary_key=True)
    major_name = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Major'


class EPhoto(models.Model):
    photo_key = models.BigAutoField(primary_key=True)
    user_key = models.ForeignKey('EUser', models.DO_NOTHING, db_column='user_key')
    photo_name = models.CharField(max_length=50)
    path = models.CharField(max_length=256)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Photo'


class ETag(models.Model):
    tag_key = models.BigAutoField(primary_key=True)
    tag_name = models.CharField(max_length=20)
    tag_type = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Tag'


class EUniversity(models.Model):
    university_key = models.BigAutoField(primary_key=True)
    university_name = models.CharField(max_length=20)
    location = models.CharField(max_length=20)
    email_domain = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_University'


class EUser(models.Model):
    user_key = models.BigAutoField(primary_key=True)
    university_key = models.ForeignKey(EUniversity, models.DO_NOTHING, db_column='university_key')
    college_key = models.ForeignKey(ECollege, models.DO_NOTHING, db_column='college_key')
    major_key = models.ForeignKey(EMajor, models.DO_NOTHING, db_column='major_key')
    user_name = models.CharField(max_length=20)
    gender = models.CharField(max_length=1)
    interested_gender = models.CharField(max_length=1)
    birthday = models.DateTimeField()
    email = models.CharField(max_length=50)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_User'


class RCollegemajor(models.Model):
    college_key = models.OneToOneField(ECollege, models.DO_NOTHING, db_column='college_key', primary_key=True)
    major_key = models.ForeignKey(EMajor, models.DO_NOTHING, db_column='major_key')

    class Meta:
        managed = False
        db_table = 'R_CollegeMajor'
        unique_together = (('college_key', 'major_key'),)


class RPitapat(models.Model):
    from_field = models.ForeignKey(EUser, models.DO_NOTHING, db_column='from', blank=True, null=True, related_name="from_field")  # Field renamed because it was a Python reserved word.
    to = models.ForeignKey(EUser, models.DO_NOTHING, db_column='to', blank=True, null=True, related_name="to")

    class Meta:
        managed = False
        db_table = 'R_Pitapat'


class RUniversitycollege(models.Model):
    university_key = models.OneToOneField(EUniversity, models.DO_NOTHING, db_column='university_key', primary_key=True)
    college_key = models.ForeignKey(ECollege, models.DO_NOTHING, db_column='college_key')

    class Meta:
        managed = False
        db_table = 'R_UniversityCollege'
        unique_together = (('university_key', 'college_key'),)


class RUsertag(models.Model):
    user_key = models.OneToOneField(EUser, models.DO_NOTHING, db_column='user_key', primary_key=True)
    tag_key = models.ForeignKey(ETag, models.DO_NOTHING, db_column='tag_key')

    class Meta:
        managed = False
        db_table = 'R_UserTag'
        unique_together = (('user_key', 'tag_key'),)
