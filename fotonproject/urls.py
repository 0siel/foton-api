#fotonproject/urls.py
# Establece las rutas de la aplicación hacia las demas APPS

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

# Provee una manera simple de definir una URL
router = routers.DefaultRouter()

# Registra las rutas de las diferentes APPS de la API
urlpatterns = [
    path('admin/', admin.site.urls), #Ruta de administrador de Django
    path('api/', include('fotonsite.urls')), #Ruta de la API

    #authentification
    path('api/', include('authentication.urls')), #Rutas de autenticación(Registro, Login, Logout, etc)
    path('api/', include(router.urls)), #Incluye las rutas definidas en router
    path('api/docs/', include_docs_urls(title='Foton API')), #Documentación de la API

]
# Si el modo DEBUG esta activado, se añade la ruta de los archivos multimedia
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)