from datetime import datetime

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin,
                                        UserManager)
from django.db import models


class UnsignedAutoField(models.BigAutoField):
    def db_type(self, connection):
        return 'bigint UNSIGNED AUTO_INCREMENT'

    def rel_db_type(self, connection):
        return 'bigint UNSIGNED'


class University(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='university_key')
    name = models.CharField(max_length=20, db_column='university_name')
    location = models.CharField(max_length=20)
    email_domain = models.CharField(max_length=20)
    colleges = models.ManyToManyField(
        'College',
        through='UniversityCollege',
        through_fields=('university', 'college'),
    )
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_University'
        verbose_name = 'University'
        verbose_name_plural = 'Universities'


class College(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='college_key')
    name = models.CharField(max_length=20, db_column='college_name')
    majors = models.ManyToManyField(
        'Major',
        through='CollegeMajor',
        through_fields=('college', 'major'),
    )
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_College'
        verbose_name = 'College'


class Major(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='major_key')
    name = models.CharField(max_length=20, db_column='major_name')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Major'
        verbose_name = 'Major'


class MyUserManager(UserManager):
    # pylint: disable=arguments-renamed
    def _create_user(self, phone, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    # pylint: disable=arguments-renamed
    def create_user(self, phone, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(phone, email, password, **extra_fields)

    # pylint: disable=arguments-renamed
    def create_superuser(self, phone, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(
            phone,
            email,
            password,
            university=University.objects.get(name="admin"),
            college=College.objects.get(name="admin"),
            major=Major.objects.get(name="admin"),
            birthday=datetime.now(),
            **extra_fields,
        )


class User(AbstractBaseUser, PermissionsMixin):
    key = UnsignedAutoField(primary_key=True, db_column='user_key')
    university = models.ForeignKey(
        University,
        on_delete=models.RESTRICT,
        db_column='university_key',
    )
    college = models.ForeignKey(College, on_delete=models.RESTRICT, db_column='college_key')
    major = models.ForeignKey(Major, on_delete=models.RESTRICT, db_column='major_key')
    nickname = models.CharField(unique=True, max_length=30, db_column='nickname')
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
    REQUIRED_FIELDS = ['phone']

    objects = MyUserManager()

    class Meta:
        managed = False
        db_table = 'E_User'
        verbose_name = 'User'


class Introduction(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='introduction_key')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_key')
    field = models.TextField()
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Introduction'
        verbose_name = 'Introduction'


class Photo(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='photo_key')
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='photos',
        db_column='user_key',
    )
    name = models.CharField(max_length=50, db_column='photo_name')
    path = models.CharField(max_length=256)
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Photo'
        verbose_name = 'Photo'


class Tag(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='tag_key')
    name = models.CharField(max_length=20, db_column='tag_name')
    type = models.CharField(max_length=20, db_column='tag_type')
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'E_Tag'
        verbose_name = 'Tag'


class Chatroom(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='chatroom_key')
    user_count = models.IntegerField(null=False, db_column='user_count')
    reg_dt = models.DateTimeField(auto_now_add=True, null=False)

    class Meta:
        managed = False
        db_table = 'E_Chatroom'


class Chat(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='chat_key')
    chatroom = models.ForeignKey(
        Chatroom,
        on_delete=models.CASCADE,
        related_name='chats',
        db_column='chatroom_key',
    )
    from_field = models.ForeignKey(
        'User',
        on_delete=models.SET_NULL,
        null=True,
        related_name='chat_from',
        db_column='from',
    )
    valid = models.CharField(max_length=1)
    content = models.TextField()
    reg_dt = models.DateTimeField()
    upd_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'E_Chat'


class UserChatroom(models.Model):
    user = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.CASCADE,
        db_column='user_key',
    )
    chatroom = models.ForeignKey(Chatroom, on_delete=models.RESTRICT, db_column='chatroom_key')

    class Meta:
        managed = False
        db_table = 'R_UserChatRoom'
        verbose_name = 'User-Chatroom Relationship'
        unique_together = (('user', 'chatroom'),)


class UniversityCollege(models.Model):
    university = models.OneToOneField(
        University,
        primary_key=True,
        on_delete=models.RESTRICT,
        db_column='university_key',
    )
    college = models.ForeignKey(College, on_delete=models.RESTRICT, db_column='college_key')

    class Meta:
        managed = False
        db_table = 'R_UniversityCollege'
        verbose_name = 'University-College Relationship'
        unique_together = (('university', 'college'),)


class CollegeMajor(models.Model):
    college = models.OneToOneField(
        College,
        primary_key=True,
        on_delete=models.RESTRICT,
        db_column='college_key',
    )
    major = models.ForeignKey(Major, on_delete=models.RESTRICT, db_column='major_key')

    class Meta:
        managed = False
        db_table = 'R_CollegeMajor'
        verbose_name = 'College-Major Relationship'
        unique_together = (('college', 'major'),)


class Pitapat(models.Model):
    from_field = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.CASCADE,
        related_name='pitapat_from',
        db_column='from',
    )
    to = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='pitapat_to',
        db_column='to',
    )

    class Meta:
        managed = False
        db_table = 'R_Pitapat'
        verbose_name = 'pitapat'
        unique_together = (('from_field', 'to'),)


class UserTag(models.Model):
    user = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.RESTRICT,
        db_column='user_key',
    )
    tag = models.ForeignKey(Tag, on_delete=models.RESTRICT, db_column='tag_key')

    class Meta:
        managed = False
        db_table = 'R_UserTag'
        verbose_name = 'User-Tag Relationship'
        unique_together = (('user', 'tag'),)
