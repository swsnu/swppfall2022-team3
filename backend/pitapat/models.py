from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.hashers import make_password

class ECollege(models.Model):
    college_key = models.BigAutoField(primary_key=True)
    college_name = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_College'
        verbose_name='College'


class EIntroduction(models.Model):
    introduction_key = models.BigAutoField(primary_key=True)
    user_key = models.ForeignKey('EUser', models.DO_NOTHING, db_column='user_key')
    field = models.TextField(db_column='Field')  # Field name made lowercase.
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Introduction'
        verbose_name='Introduction'


class EMajor(models.Model):
    major_key = models.BigAutoField(primary_key=True)
    major_name = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Major'
        verbose_name='Major'


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
        db_table = 'E_Photo'
        verbose_name='Photo'


class ETag(models.Model):
    tag_key = models.BigAutoField(primary_key=True)
    tag_name = models.CharField(max_length=20)
    tag_type = models.CharField(max_length=20)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Tag'
        verbose_name='Tag'


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
        db_table = 'E_University'
        verbose_name='University'
        verbose_name_plural='Universities'


class EUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(
            email,
            password,
            university_key=EUniversity.objects.get(university_name="admin"),
            college_key=ECollege.objects.get(college_name="admin"),
            major_key=EMajor.objects.get(major_name="admin"),
            birthday=datetime.now(),
            **extra_fields,
        )


class EUser(AbstractBaseUser, PermissionsMixin):
    user_key = models.BigAutoField(primary_key=True)
    university_key = models.ForeignKey(EUniversity, models.DO_NOTHING, db_column='university_key')
    college_key = models.ForeignKey(ECollege, models.DO_NOTHING, db_column='college_key')
    major_key = models.ForeignKey(EMajor, models.DO_NOTHING, db_column='major_key')
    username = models.CharField(unique=True, max_length=30, db_column='user_name')
    email = models.CharField(unique=True, max_length=50)
    phone = models.CharField(unique=True, max_length=20)
    status = models.CharField(max_length=1)
    gender = models.CharField(max_length=1)
    interested_gender = models.CharField(max_length=1)
    birthday = models.DateTimeField()
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = EUserManager()

    class Meta:
        db_table = 'E_User'
        verbose_name='User'


class RCollegemajor(models.Model):
    college_key = models.OneToOneField(ECollege, models.DO_NOTHING, db_column='college_key', primary_key=True)
    major_key = models.ForeignKey(EMajor, models.DO_NOTHING, db_column='major_key')

    class Meta:
        db_table = 'R_CollegeMajor'
        verbose_name='College-Major Relationship'
        unique_together = (('college_key', 'major_key'),)


class RPitapat(models.Model):
    from_field = models.ForeignKey(EUser, models.DO_NOTHING, db_column='from', blank=True, null=True, related_name="from_field")  # Field renamed because it was a Python reserved word.
    to = models.ForeignKey(EUser, models.DO_NOTHING, db_column='to', blank=True, null=True, related_name="to")

    class Meta:
        db_table = 'R_Pitapat'
        verbose_name='pitapat'


class RUniversitycollege(models.Model):
    university_key = models.OneToOneField(EUniversity, models.DO_NOTHING, db_column='university_key', primary_key=True)
    college_key = models.ForeignKey(ECollege, models.DO_NOTHING, db_column='college_key')

    class Meta:
        db_table = 'R_UniversityCollege'
        verbose_name='University-College Relationship'
        unique_together = (('university_key', 'college_key'),)


class RUsertag(models.Model):
    user_key = models.OneToOneField(EUser, models.DO_NOTHING, db_column='user_key', primary_key=True)
    tag_key = models.ForeignKey(ETag, models.DO_NOTHING, db_column='tag_key')

    class Meta:
        db_table = 'R_UserTag'
        verbose_name='User-Tag Relationship'
        unique_together = (('user_key', 'tag_key'),)
