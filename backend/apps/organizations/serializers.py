from rest_framework import serializers
from .models import Organizations


class OrganizationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizations
        fields = ('id', 'title', 'website', 'phone', 'email', "street", "city", "state", "zip_code")
