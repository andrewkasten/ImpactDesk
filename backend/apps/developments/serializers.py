from rest_framework import serializers
from .models import Developments


class DevelopmentsSerializer(serializers.ModelSerializer):
    people_name = serializers.SerializerMethodField()
    organization_title = serializers.SerializerMethodField()

    class Meta:
        model = Developments
        fields = (
            "id",
            "type",
            "date",
            "time",
            "end_time",
            "status",
            "note",
            "street",
            "city",
            "state",
            "zip_code",
            "lat",
            "lng",
            "people",
            "organization",
            "people_name",
            "organization_title",
        )

    def get_people_name(self, obj):
        return f"{obj.people.first_name} {obj.people.last_name}" if obj.people else None

    def get_organization_title(self, obj):
        return obj.organization.title if obj.organization else None

