from rest_framework import serializers


class IntroductionSerializer(serializers.Serializer):
    content = serializers.CharField(required=True)
