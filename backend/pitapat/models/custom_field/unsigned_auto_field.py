from django.db import models


class UnsignedAutoField(models.BigAutoField):
    def db_type(self, _conn):
        return 'bigint UNSIGNED AUTO_INCREMENT'

    def rel_db_type(self, _conn):
        return 'bigint UNSIGNED'
