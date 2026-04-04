from django.db import models

# Create your models here.

class Organizations(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)
    website = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    street = models.CharField(max_length=255, null=True,blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255,null=True, blank=True)
    zip_code = models.IntegerField(blank=True, null=True)
    
    
