from rest_framework import serializers

from pitapat.models import Pitapat


class PitapatSerializer(serializers.ModelSerializer):
    def get_fields(self):
        fields = super().get_fields()
        is_from = fields.pop('is_from')
        fields['from'] = is_from
        return fields

    class Meta:
        model = Pitapat
        fields = ['is_from', 'to']
