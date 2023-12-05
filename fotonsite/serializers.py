from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Post
    fields = ('id', 'title', 'user', 'date_posted', 'image', 'likes')
    read_only_fields = ('id', 'user', 'date_posted', 'likes')
    


