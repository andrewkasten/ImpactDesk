from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Developments
from .serializers import DevelopmentsSerializer
from rest_framework import generics


class DevelopmentsView(generics.ListCreateAPIView):
    serializer_class = DevelopmentsSerializer

    def get_queryset(self):
        queryset = Developments.objects.all().order_by('date','time')
        date = self.request.query_params.get('date')
        
        if date is not None:
            queryset = queryset.filter(date=date)
        return queryset
    
    def post(self, request):
        serializer = DevelopmentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SingleDevelopmentView(APIView):
    def get(self, request, pk):
        development = get_object_or_404(Developments, pk=pk)
        serializer = DevelopmentsSerializer(development)
        return Response(serializer.data)
    
    def put(self, request, pk):
        development = get_object_or_404(Developments, pk=pk)
        serializer = DevelopmentsSerializer(development, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        development = get_object_or_404(Developments, pk=pk)
        development.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
