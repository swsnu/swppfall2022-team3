from rest_framework import serializers


class IntroductionSerializer(serializers.Serializer):
    content = serializers.CharField(required=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
