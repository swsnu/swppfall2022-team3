from datetime import date

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    user_key = models.AutoField(
        _('user key'),
        primary_key=True,
    )

    # university_key = models.ForeignKey(
    #     _('university key'),
    #     University,
    #     on_delete=models.CASCADE,
    # )

    # college_key = models.ForeignKey(
    #     _('college key'),
    #     College,
    #     on_delete=models.CASCADE,
    # )

    # major_key = models.ForeignKey(
    #     _('major key'),
    #     Major,
    #     on_delete=models.CASCADE,
    # )

    email = models.EmailField(
        _('email'),
        max_length=50,
        blank=False,
        unique=True,
    )

    username = models.CharField(
        _('username'),
        max_length=20,
        blank=False,
    )

    class Gender(models.TextChoices):
        MALE = 'M', _('male')
        FEMALE = 'F', _('female')

    gender = models.CharField(
        _('gender'),
        max_length=1,
        blank=False,
        choices=Gender.choices,
    )

    def year_choices():
        return [(year, year) for year in range(1900, date.today().year + 1)]

    birth_year = models.IntegerField(
        _('year'),
        blank=False,
        choices=year_choices(),
    )

    location = models.CharField(
        _('location'),
        max_length=10,
        blank=False,
    )

    is_approved = models.BooleanField(
        _('is approved'),
        default=False,
    )

    reg_dt = models.DateTimeField(
        _('registered date'),
        auto_now_add=True,
    )

    # reg_id = models.CharField(
    #     _('register id'),
    #     max_length=50,
    # )

    upd_dt = models.DateTimeField(
        _('updated date'),
        auto_now=True,
    )

    # upd_id = models.CharField(
    #     _('update id'),
    #     max_length=50,
    # )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'gender', 'birth_year', 'location']
