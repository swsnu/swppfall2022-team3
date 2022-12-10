from django.db import models

from pitapat.models.custom_field.unsigned_auto_field import UnsignedAutoField
from pitapat.models.chatroom import Chatroom
from pitapat.models.user import User


class UserChatroom(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='user_chatroom_key')
    user = models.OneToOneField(User, models.CASCADE, db_column='user_key')
    chatroom = models.ForeignKey(Chatroom, models.CASCADE, db_column='chatroom_key')

    def __str__(self):
        return f'user {self.user.key} - chatroom {self.chatroom.key}'

    class Meta:
        managed = False
        db_table = 'R_UserChatroom'
        verbose_name = 'User-Chatroom Relationship'
        unique_together = (('user', 'chatroom'),)
