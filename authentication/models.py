from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
def path_to_picture(instance, filename):                   # new
  return f'profile_pictures/{instance.id}/{filename}'
# Custom user model, modifica el modelo de usuario por defecto de Django para añadir el campo email y el campo profile_picture utilizado para almacenar la imagen de perfil del usuario.
class CustomUser(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    profile_picture = models.ImageField(upload_to=path_to_picture, null=True, blank=True)  # new
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

