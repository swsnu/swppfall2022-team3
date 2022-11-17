from django.db import models

from .chatroom import Chatroom
from .custom_field.unsigned_auto_field import UnsignedAutoField
from .user import User


class Chat(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='chat_key')
    chatroom = models.ForeignKey(Chatroom, models.CASCADE, related_name='chats', db_column='chatroom_key')
    author = models.ForeignKey(
        User,
        null=True,
        db_column='from',
        related_name='sent_chats',
        on_delete=models.SET_NULL
    )
    valid = models.CharField(max_length=1)
    content = models.TextField()
    reg_dt = models.DateTimeField()
    upd_dt = models.DateTimeField()

    def __str__(self):
        return f'{self.author.nickname}: {self.content}'

    class Meta:
        managed = False
        db_table = 'E_Chat'
