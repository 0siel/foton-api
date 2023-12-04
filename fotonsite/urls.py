from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PostListCreateView, PostDetailView

urlpatterns =[
  #path('posts/create/', views.PostCreate.as_view()),
  path('posts/', PostListCreateView.as_view(), name='post_list_create'),
  path('posts/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)