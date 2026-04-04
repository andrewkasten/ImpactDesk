from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from rest_framework import status

# Create your tests here.
class AuthTest(TestCase):

   def setUp(self):
      self.user = User.objects.create_user(
         first_name='name',
         username='testuser',
         password='password123',
      )
      self.token = Token.objects.create(user=self.user)
      self.client = APIClient()
      self.url = '/api/developments/'

   def test_auth_user_login(self):
      self.client.force_authenticate(user=self.user)

      response = self.client.get(self.url)
      self.assertEqual(response.status_code, 200)

   def test_invalid_login(self):
      response = self.client.get(self.url)

      self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_access_with_valid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

   def test_access_without_token(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

   def test_access_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token invalidtoken123')
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


