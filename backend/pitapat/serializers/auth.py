from rest_framework import serializers


class AuthEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    request_time = serializers.DateTimeField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

class AuthVerifySerializer(AuthEmailSerializer):
    code = serializers.CharField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
