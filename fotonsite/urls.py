from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PostListCreateView, PostDetailView, like_post, TopPostsView
#from rest_framework.documentation import include_docs_urls

urlpatterns =[
  #path('posts/create/', views.PostCreate.as_view()),
  path('posts/', PostListCreateView.as_view(), name='post_list_create'),
  path('posts/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
  path('posts/<int:post_id>/like/', like_post, name='like_post'),
  path('top-posts/', TopPostsView.as_view(), name='top_posts'),
  #path('docs/posts/', include_docs_urls(title='Foton API')),
]

urlpatterns = format_suffix_patterns(urlpatterns)