from django.shortcuts import get_object_or_404

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Donations
from .serializers import DonationsSerializer

# Create your views here.
class DonationsView(APIView):

    def get(self, request):
        donations = Donations.objects.all()
        serializer = DonationsSerializer(donations, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = DonationsSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SingleDonationView(APIView):
    def get(self, request, pk):
        donation = get_object_or_404(Donations, pk=pk)
        serializer = DonationsSerializer(donation)
        return Response(serializer.data)
    
    def put(self, request, pk):
        donation = get_object_or_404(Donations, pk=pk)
        serializer = DonationsSerializer(donation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        donation = get_object_or_404(Donations, pk=pk)
        donation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

