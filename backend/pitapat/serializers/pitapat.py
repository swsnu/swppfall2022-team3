from rest_framework import serializers

from pitapat.models import Pitapat


class PitapatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pitapat
        fields = ['is_from', 'to']
