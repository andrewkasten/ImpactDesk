from django.urls import path
from .views import PeopleView, SinglePersonView


urlpatterns = [
    path('', PeopleView.as_view()),
    path('<int:pk>', SinglePersonView.as_view()),
]