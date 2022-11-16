from django.db import models
from pitapat.models import Chatroom, User


class UserChatroom(models.Model):
    user = models.OneToOneField(User, models.CASCADE, db_column='user_key', primary_key=True)
    chatroom = models.ForeignKey(Chatroom, models.RESTRICT, db_column='chatroom_key')

    class Meta:
        managed = False
        db_table = 'R_UserChatRoom'
        verbose_name = 'User-Chatroom Relationship'
        unique_together = (('user', 'chatroom'),)
