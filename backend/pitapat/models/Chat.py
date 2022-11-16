from django.db import models
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField
from pitapat.models import Chatroom, User


class Chat(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='chat_key')
    chatroom = models.ForeignKey(Chatroom, models.CASCADE, related_name='chats', db_column='chatroom_key')
    author = models.ForeignKey(
        User,
        null=True,
        related_name='sent_chats',
        on_delete=models.SET_NULL
    )
    valid = models.CharField(max_length=1)
    content = models.TextField()
    reg_dt = models.DateTimeField()
    upd_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'E_Chat'
