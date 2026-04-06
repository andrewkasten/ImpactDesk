from django.test import TestCase
from apps.donations.models import Donations
from apps.people.models import People 


class DonationsTest(TestCase):

   def setUp(self):
      People.objects.create(
         first_name="First",
         last_name="Last",
         phone="5554443333",
         email="email@email.com",
         street="123 Street",
         city="Provo",
         state="UT",
         zip_code=16151,
         )     

   def test_donation_has_people(self):

      first = People.objects.get(first_name="First")
      donation = Donations.objects.create(person=first, donations=50)              
      self.assertEqual(donation.donations, 50)
      self.assertEqual(donation.person_id, first.pk)
     
