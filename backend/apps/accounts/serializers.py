from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }
        
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name']