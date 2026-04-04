from django.db import models

# Create your models here.

class Organizations(models.Model):
    title = models.CharField(max_length=255)
    website = models.URLField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    street = models.CharField(max_length=255, null=True,blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255,null=True, blank=True)
    zip_code = models.IntegerField(blank=True, null=True)
    
    
