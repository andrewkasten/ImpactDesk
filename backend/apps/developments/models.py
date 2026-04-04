from django.db import models
from datetime import date
from apps.people.models import People
from apps.organizations.models import Organizations


# Create your models here.
class Developments(models.Model):
    STATUS_CHOICES = [
        ("scheduled" , "Scheduled"),
        ("completed" , "Completed"),
        ("canceled" , "Canceled"),
        ("pending" , "Pending")
    ]

    type = models.CharField(max_length=255)
    date =  models.DateField(default=date.today)
    time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    status = models.CharField( max_length=10, default="Scheduled", choices = STATUS_CHOICES)   
    note = models.TextField(blank=True)
    street = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    zip_code = models.CharField(max_length=10, blank=True)
    
    lat = models.DecimalField(max_digits=25, decimal_places=15, blank=True, default=0)
    lng = models.DecimalField(max_digits=25, decimal_places=15, blank=True, default=0)
    
    people = models.ForeignKey(People, on_delete=models.CASCADE, null=True, blank=True)
    organization = models.ForeignKey(Organizations, on_delete=models.CASCADE, null=True, blank=True)
