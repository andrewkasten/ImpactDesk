from django.db import models
from django.core import validators as v
from datetime import date
from apps.people.models import People
from apps.organizations.models import Organizations

# Create your models here.
class Donations(models.Model):
    person = models.ForeignKey(People, related_name='donations', on_delete=models.CASCADE, null=True, blank=True)
    organization = models.ForeignKey(Organizations, on_delete=models.CASCADE, null=True, blank=True)
    donations = models.DecimalField(default=0, max_digits = 20, decimal_places=2)
    donate_type = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateField(default=date.today)
    

    