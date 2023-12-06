#from rest_framework import serializers
#from django.contrib.auth import get_user_model
#from django.contrib.auth.hashers import make_password
#from fotonsite.serializers import UserPostSerializer
"""
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
        raise serializers.ValidationError("Username already exists")
    
    def update(self, instance, validated_data):
        validated_data.pop('email', None)
        return super().update(instance, validated_data)
    def validate_email(self, value):
        #Is the email already in use?
        try:
            user = get_user_model().objects.get(email=value)
        except get_user_model().DoesNotExist:
            return value
        raise serializers.ValidationError("El email ya está en uso")

class UserProfileSerializer(serializers.ModelSerializer):
    posts = UserPostSerializer(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'profile_picture', 'id', 'posts')

"""