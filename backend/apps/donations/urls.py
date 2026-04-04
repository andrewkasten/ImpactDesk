from django.urls import path
from .views import DonationsView, SingleDonationView


urlpatterns = [
    path('', DonationsView.as_view()),
    path('<int:pk>', SingleDonationView.as_view()),
]