from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import UserListGetSerializer

@api_view(['GET'])
def user(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserListGetSerializer(users, many=True)
        return Response(serializer.data)
