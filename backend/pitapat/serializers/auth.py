from rest_framework import serializers


class AuthEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    request_time = serializers.DateTimeField()


class AuthVerifySerializer(AuthEmailSerializer):
    code = serializers.CharField()
