from rest_framework import permissions
#Restriccion para que solo el usuario dueno del post pueda modificarlo/eliminarlo
class IsPostOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Solo el dueño del post puede realizar acciones (eliminar, actualizar)
        return obj.user == request.user
    