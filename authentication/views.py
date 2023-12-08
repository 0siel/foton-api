from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from fotonsite.serializers import UserSerializer, UserProfileSerializer

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework.authtoken.models import Token
from django.http import JsonResponse

class LoginView(APIView):
  def post(self, request):
    email = request.data.get('email', None)
    password = request.data.get('password', None)
    user = authenticate(email=email, password=password)
    if user:
      login(request, user)
      token, _ = Token.objects.get_or_create(user=user)
      response = Response(UserSerializer(user).data, status=status.HTTP_200_OK)
      response.set_cookie(key='auth_token', value=token.key, httponly=True)
      return response

    return Response(status=status.HTTP_401_UNAUTHORIZED)
  
class LogoutView(APIView):
  def post(self, request):
    logout(request)
    return Response(status=status.HTTP_200_OK)
  
class SignupView(generics.CreateAPIView):
  serializer_class = UserSerializer
  
  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      if user:
        login(request, user)
        return Response(
          UserSerializer(user).data,
          status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # Aquí deberíamos mandar un correo al cliente...
    print(
        f"\nRecupera la contraseña del correo '{reset_password_token.user.email}' usando el token '{reset_password_token.key}' desde la API http://localhost:8000/api/auth/reset/confirm/.\n\n"

        f"También puedes hacerlo directamente desde el cliente web en http://localhost:3000/new-password/?token={reset_password_token.key}.\n")

class ProfileView(generics.RetrieveUpdateAPIView):
  serializer_class = UserProfileSerializer
  http_method_names = ['get', 'patch']

  def get_object(self):
    return self.request.user

class UpdateProfileView(generics.UpdateAPIView):
  serializer_class = UserProfileSerializer
  http_method_names = ['patch']

  def get_object(self):
    return self.request.user 
  