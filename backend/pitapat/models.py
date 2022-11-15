from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.hashers import make_password


class University(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='university_key')
    name = models.CharField(max_length=20, db_column='university_name')
    location = models.CharField(max_length=20)
    email_domain = models.CharField(max_length=20)
    colleges = models.ManyToManyField('College', through='UniversityCollege', through_fields=('university', 'college'))
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_University'
        verbose_name = 'University'
        verbose_name_plural = 'Universities'


class College(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='college_key')
    name = models.CharField(max_length=20, db_column='college_name')
    majors = models.ManyToManyField('Major', through='CollegeMajor', through_fields=('college', 'major'))
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_College'
        verbose_name = 'College'


class Major(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='major_key')
    name = models.CharField(max_length=20, db_column='major_name')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Major'
        verbose_name = 'Major'


class MyUserManager(UserManager):
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
            university_key=University.objects.get(university_name="admin"),
            college_key=College.objects.get(college_name="admin"),
            major_key=Major.objects.get(major_name="admin"),
            birthday=datetime.now(),
            **extra_fields,
        )


class User(AbstractBaseUser, PermissionsMixin):
    key = models.BigAutoField(primary_key=True, db_column='user_key')
    university = models.ForeignKey(University, models.CASCADE, db_column='university_key')
    college = models.ForeignKey(College, models.DO_NOTHING, db_column='college_key')
    major = models.ForeignKey(Major, models.DO_NOTHING, db_column='major_key')
    username = models.CharField(unique=True, max_length=30, db_column='user_name')
    email = models.CharField(unique=True, max_length=50)
    phone = models.CharField(unique=True, max_length=20)
    status = models.CharField(max_length=1)
    gender = models.CharField(max_length=1)
    interested_gender = models.CharField(max_length=1)
    birthday = models.DateTimeField()
    tags = models.ManyToManyField('Tag', through='UserTag', through_fields=('user', 'tag'))
    pitapat = models.ManyToManyField('User', through='Pitapat', through_fields=('from_field', 'to'))
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyUserManager()

    class Meta:
        db_table = 'E_User'
        verbose_name = 'User'


class Introduction(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='introduction_key')
    user = models.ForeignKey(User, models.CASCADE, db_column='user_key')
    field = models.TextField()
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Introduction'
        verbose_name = 'Introduction'


class Photo(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='photo_key')
    user = models.ForeignKey(User, models.CASCADE, related_name='photos', db_column='user_key')
    name = models.CharField(max_length=50, db_column='photo_name')
    path = models.CharField(max_length=256)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Photo'
        verbose_name = 'Photo'


class Tag(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='tag_key')
    name = models.CharField(max_length=20, db_column='tag_name')
    type = models.CharField(max_length=20, db_column='tag_type')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        db_table = 'E_Tag'
        verbose_name = 'Tag'


class Chat(models.Model):
    key = models.BigAutoField(primary_key=True, db_column='chat_key')
    from_field = models.ForeignKey('User', models.CASCADE, db_column='from', related_name='chat_from')
    to = models.ForeignKey('User', models.CASCADE, db_column='to', related_name='chat_to')
    valid = models.CharField(max_length=1)
    content = models.TextField()
    reg_dt = models.DateTimeField()
    upd_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'E_Chat'


class UniversityCollege(models.Model):
    university = models.OneToOneField(University, models.CASCADE, db_column='university_key', primary_key=True)
    college = models.ForeignKey(College, models.CASCADE, db_column='college_key')

    class Meta:
        db_table = 'R_UniversityCollege'
        verbose_name = 'University-College Relationship'
        unique_together = (('university', 'college'),)


class CollegeMajor(models.Model):
    college = models.OneToOneField(College, models.CASCADE, db_column='college_key', primary_key=True)
    major = models.ForeignKey(Major, models.CASCADE, db_column='major_key')

    class Meta:
        db_table = 'R_CollegeMajor'
        verbose_name = 'College-Major Relationship'
        unique_together = (('college', 'major'),)


class Pitapat(models.Model):
    from_field = models.ForeignKey(User, models.CASCADE, db_column='from', related_name='pitapat_from')
    to = models.ForeignKey(User, models.CASCADE, db_column='to', related_name='pitapat_to')

    class Meta:
        db_table = 'R_Pitapat'
        verbose_name = 'pitapat'


class UserTag(models.Model):
    user = models.OneToOneField(User, models.CASCADE, db_column='user_key', primary_key=True)
    tag = models.ForeignKey(Tag, models.CASCADE, db_column='tag_key')

    class Meta:
        db_table = 'R_UserTag'
        verbose_name = 'User-Tag Relationship'
        unique_together = (('user', 'tag'),)
