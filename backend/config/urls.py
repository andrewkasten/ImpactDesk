"""
URL configuration for config project.

"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/developments/', include('apps.developments.urls')),
    path('api/donations/', include('apps.donations.urls')),
    path('api/organizations/', include('apps.organizations.urls')),
    path('api/people/', include('apps.people.urls')),
    path('auth/', include('apps.accounts.urls')),
]
