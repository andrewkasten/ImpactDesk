from django.urls import path
from .views import DevelopmentsView, SingleDevelopmentView


urlpatterns = [
    path('', DevelopmentsView.as_view()),
    path('<int:pk>', SingleDevelopmentView.as_view()),
]