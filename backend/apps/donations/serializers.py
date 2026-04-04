from rest_framework import serializers
from django.db.models import Sum
from .models import Donations


class DonationsSerializer(serializers.ModelSerializer):

    total_donations = serializers.SerializerMethodField()

    class Meta:
        model = Donations
        fields = ('id', 
                  'person', 
                  'organization', 
                  'donations', 
                  'donate_type', 
                  'date',
                  'total_donations',
                  )

    
    def get_total_donations(self, obj):
        return Donations.objects.aggregate(total=Sum("donations"))["total"] or 0

#obj.donations is one field value, Donatins.objects is all instance