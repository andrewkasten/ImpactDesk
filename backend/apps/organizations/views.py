# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Organizations
from .serializers import OrganizationsSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class OrganizationsView(APIView):

    def get(self, request):
        organizations = Organizations.objects.all()
        serializer = OrganizationsSerializer(organizations, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = OrganizationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SingleOrganizationView(APIView):
    def get(self, request, pk):
        organization = get_object_or_404(Organizations, pk=pk)
        serializer = OrganizationsSerializer(organization)
        return Response(serializer.data)
    
    def put(self, request, pk):
        organization = get_object_or_404(Organizations, pk=pk)
        serializer = OrganizationsSerializer(organization, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        organization = get_object_or_404(Organizations, pk=pk)
        organization.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

