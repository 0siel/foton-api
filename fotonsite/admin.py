from django.contrib import admin
from .models import Post

# Register your models here.
admin.site.register(Post) #Registra el modelo Post en el administrador de Django para poder gestionarlo desde allí