from django.contrib import admin

from .models import (Chat, Chatroom, College, Introduction,
                     Major, Photo, Pitapat, Tag, University,
                     User, UserChatroom, UserTag)

admin.site.register(University)
admin.site.register(College)
admin.site.register(Major)
admin.site.register(User)
admin.site.register(Introduction)
admin.site.register(Photo)
admin.site.register(Tag)
admin.site.register(Chatroom)
admin.site.register(Chat)
admin.site.register(Pitapat)
admin.site.register(UserTag)
admin.site.register(UserChatroom)
