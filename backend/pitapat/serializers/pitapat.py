from rest_framework import serializers

from pitapat.models import Pitapat


class PitapatSerializer(serializers.ModelSerializer):
    def get_fields(self):
        fields = super().get_fields()
        is_from = fields.pop('is_from')
        # pylint: disable=invalid-name
        to = fields.pop('to')
        fields['from'] = is_from
        fields['to'] = to
        return fields

    class Meta:
        model = Pitapat
        fields = ['is_from', 'to']
