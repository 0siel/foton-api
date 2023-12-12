from rest_framework import serializers
#from authentication.serializers import UserSerializer

######################
from .models import Post, Like
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
       required=True)
    username = serializers.CharField(
       required=True, min_length=4, max_length=20
    )
    password = serializers.CharField(
        min_length=8, write_only=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True, allow_empty_file=True)

    class Meta:
        model = get_user_model()
        fields = ('id','email', 'username', 'password', 'profile_picture' )

    def validate_password(self, value):
        return make_password(value)
    
    def validate_username(self, value):
        value = value.replace(" ", "")
        try:
            user = get_user_model().objects.get(username=value)
            if user == self.instance:
                return value
        except get_user_model().DoesNotExist:
            return value
        raise serializers.ValidationError("El nombre de usuario ya está en uso")
    
    def update(self, instance, validated_data):
        validated_data.pop('email', None)
        return super().update(instance, validated_data)
    def validate_email(self, value):
        #Is the email already in use?
        try:
            user = get_user_model().objects.get(email=value)
        except get_user_model().DoesNotExist:
            return value
        raise serializers.ValidationError("El correo ya está en uso")

class PostSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  user_has_liked = serializers.SerializerMethodField()
  class Meta:
    model = Post
    fields = ('id', 'title', 'user', 'date_posted', 'image', 'likes', 'user_has_liked')
    read_only_fields = ('id', 'user', 'date_posted', 'likes')

  def get_user_has_liked(self, obj):
    request = self.context.get('request')
    if request is None:
      return False
    return obj.likes.filter(id=request.user.id).exists()

class UserPostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ('id', 'title', 'date_posted', 'image', 'likes')
    read_only_fields = ('id', 'date_posted', 'likes')
    

######################

class UserProfileSerializer(serializers.ModelSerializer):
    posts = UserPostSerializer(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'profile_picture', 'id', 'posts')

