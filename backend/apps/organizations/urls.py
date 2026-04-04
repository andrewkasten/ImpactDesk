from django.urls import path
from .views import OrganizationsView, SingleOrganizationView


urlpatterns = [
    path('', OrganizationsView.as_view()),
    path('<int:pk>', SingleOrganizationView.as_view()),
]