from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    #content = models.TextField()
    
    date_posted = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    likes = models.IntegerField(default=0)
    

    def __str__(self):
        return self.title
    

