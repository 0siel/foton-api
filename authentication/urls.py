from django.urls import path, include
from .views import LoginView, LogoutView,  SignupView, ProfileView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Auth views
    path('auth/login/',
         LoginView.as_view(), name='auth_login'),

    path('auth/logout/',
         LogoutView.as_view(), name='auth_logout'),

    path('auth/signup/',
         SignupView.as_view(), name='auth_signup'),
    
    path('auth/reset/',
         include('django_rest_passwordreset.urls',
                 namespace='password_reset')),
    # Profile view
    path('user/profile/', 
         ProfileView.as_view(), name='user_profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)