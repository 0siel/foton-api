from django.db import models
from django.conf import settings
from django.db.models import Count
from django.utils import timezone
import datetime

# Create your models here.
class Post(models.Model): #Modelo de la tabla Post
    title = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    date_posted = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='post_likes', blank=True, through='Like')#Relación muchos a muchos con el modelo User para los likes

    REQUIRED_FIELDS = ['title', 'image']
    

    def __str__(self):
        return self.title
    
    @staticmethod
    def get_top_posts_today():
        today = timezone.now().date()
        return Post.objects.annotate(
            likes_count=Count('post_likes')
        ).filter(
            post_likes__timestamp__date=today
        ).order_by('-likes_count')[:10]
   

class Like(models.Model): #Modelo de la tabla Like
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_likes')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} likes {self.post.title}'