from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ('id', 'title', 'user', 'date_posted', 'image', 'likes')
    read_only_fields = ('id', 'user', 'date_posted', 'likes')
    


