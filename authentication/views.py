
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from fotonsite.serializers import UserSerializer, UserProfileSerializer

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework.authtoken.models import Token
from django.http import JsonResponse

# View que permite al usuario hacer login, maneja peticiones POST que contengan email y password, en caso de que el usuario exista y las credenciales sean correctas, se le devuelve un token de autenticación. En caso contrario, se devuelve un error 401 (Unauthorized).
class LoginView(APIView):
  # Disable authentication for this view
  def post(self, request):
    email = request.data.get('email', None)
    # Authenticating user
    password = request.data.get('password', None)
    user = authenticate(email=email, password=password)
    if user:
      login(request, user)

      token, created = Token.objects.get_or_create(user=user)
      response = Response(UserSerializer(user).data, status=status.HTTP_200_OK, )
      # Add token to response
      response.data['token'] = token.key
      return response

    return Response(status=status.HTTP_401_UNAUTHORIZED)
# View que permite al usuario hacer logout, al hacer logout se elimina el token de autenticación por lo que el usuario no podrá acceder a las rutas protegidas de la API.
class LogoutView(APIView):
  def post(self, request):
    logout(request)
    return Response(status=status.HTTP_200_OK)
# View que permite al usuario registrarse, espera una petición POST con los datos del usuario, en caso de que el usuario se haya creado correctamente, se envia una respuesta con el codigo 201 (Created) y se devuelve el usuario creado. En caso contrario, se devuelve un error 400 (Bad Request).
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


# View que permite al usuario recuperar su contraseña, espera una petición POST con el email del usuario,  se envia un correo con un token para que el usuario pueda cambiar su contraseña. En caso contrario, se devuelve un error 400 (Bad Request).
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # Aquí deberíamos mandar un correo al cliente...
    print(
        f"\nRecupera la contraseña del correo '{reset_password_token.user.email}' usando el token '{reset_password_token.key}' desde la API http://localhost:8000/api/auth/reset/confirm/.\n\n"

        f"También puedes hacerlo directamente desde el cliente web en http://localhost:3000/new-password/?token={reset_password_token.key}.\n")

# View del perfil del usuario, se devuelve el perfil del usuario que ha hecho la petición. tambien permite actualizar el perfil del usuario.
class ProfileView(generics.RetrieveUpdateAPIView):
  serializer_class = UserProfileSerializer
  http_method_names = ['get', 'patch']

  def get_object(self):
    return self.request.user

# View que permite al usuario actualizar su perfil, espera una petición PATCH con los datos del usuario, en caso de que el usuario se haya actualizado correctamente, se envia una respuesta con el codigo 200 (OK) y se devuelve el usuario actualizado. En caso contrario, se devuelve un error 400 (Bad Request).
class UpdateProfileView(generics.UpdateAPIView):
  serializer_class = UserProfileSerializer
  http_method_names = ['patch']

  def get_object(self):
    return self.request.user 
  