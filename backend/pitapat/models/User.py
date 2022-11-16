from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField
from pitapat.models import University, College, Major, PitapatUserManager


class User(AbstractBaseUser, PermissionsMixin):
    key = UnsignedAutoField(primary_key=True, db_column='user_key')
    university = models.ForeignKey(University, models.RESTRICT, db_column='university_key')
    college = models.ForeignKey(College, models.RESTRICT, db_column='college_key')
    major = models.ForeignKey(Major, models.RESTRICT, db_column='major_key')
    nickname = models.CharField(unique=True, max_length=30, db_column='nickname')
    email = models.EmailField(unique=True, max_length=50)
    phone = models.CharField(unique=True, max_length=20)
    status = models.CharField(max_length=1)
    gender = models.CharField(max_length=1)
    interested_gender = models.CharField(max_length=1)
    birthday = models.DateTimeField()
    tags = models.ManyToManyField('Tag', through='UserTag', through_fields=('user', 'tag'))
    # pitapat_sent = models.ManyToManyField('self', through='Pitapat', through_fields=('is_from', 'to'))
    # pitapat_received = models.ManyToManyField('self', through='Pitapat', through_fields=('to', 'is_from'))
    reg_dt = models.DateTimeField(auto_now_add=True)
    reg_id = models.CharField(max_length=50)
    upd_dt = models.DateTimeField(auto_now=True)
    upd_id = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    objects = PitapatUserManager()

    class Meta:
        managed = False
        db_table = 'E_User'
        verbose_name = 'User'
