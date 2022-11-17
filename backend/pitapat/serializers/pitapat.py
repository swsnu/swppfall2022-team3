from pitapat.models import Pitapat
from rest_framework import serializers


class PitaPatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pitapat
        fields = ['is_from', 'to']
