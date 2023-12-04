from django.db import models
from django.conf import settings

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    #content = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = 'posts' , on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    likes = models.IntegerField(default=0)
    

    def __str__(self):
        return self.title
    

