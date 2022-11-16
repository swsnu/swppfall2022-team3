from django.db import models
from pitapat.models.custom_field.UnsignedAutoField import UnsignedAutoField


class Chatroom(models.Model):
    key = UnsignedAutoField(primary_key=True, db_column='chatroom_key')
    user_count = models.IntegerField(db_column='user_count', null=False)
    reg_dt = models.DateTimeField(auto_now_add=True, null=False)

    def __str__(self):
        return f'chatroom {self.key}'

    class Meta:
        managed = False
        db_table = 'E_Chatroom'
