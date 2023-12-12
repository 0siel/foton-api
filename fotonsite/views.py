from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Post, Like
from .serializers import PostSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    like = Like.objects.filter(user=request.user, post=post).first()
    if like:
        like.delete()
    else: 
        Like.objects.create(user=request.user, post=post)

    return Response(status=status.HTTP_204_NO_CONTENT)
# View para listar y crear posts
class PostListCreateView(generics.ListCreateAPIView):
    
    queryset = Post.objects.all().order_by('-date_posted')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#View that returns the top 10 most liked posts  
class TopPostsView(APIView):
    def get(self, request, format=None):
        posts = Post.get_top_posts_today()
        serializer = PostSerializer(posts, many=True ,context={'request': request})
        return Response(serializer.data)
    

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]


    def get_object(self):
        obj = super().get_object()
        if self.request.method in ['PUT', 'PATCH', 'DELETE'] and obj.user != self.request.user:
            raise PermissionDenied('You do not have permission to edit or delete this post.')
        return obj

    def delete(self, request, *args, **kwargs):
        # Implementa lógica personalizada si es necesario antes de eliminar
        return self.destroy(request, *args, **kwargs)