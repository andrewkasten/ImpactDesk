from rest_framework import serializers
from django.db.models import Sum
from .models import People


class PeopleSerializer(serializers.ModelSerializer):

    donations = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    donation_total = serializers.SerializerMethodField()

    class Meta:
        model = People
        fields = (
            'id',
            'first_name',
            'last_name',
            'phone',
            'email',
            "street",
            "city",
            "state",
            "zip_code",
            "donations",
            "donation_total",
            )

    def get_donation_total(self, obj):
        return obj.donations.aggregate(total=Sum("donations"))["total"] or 0
    
    #donations is query all 