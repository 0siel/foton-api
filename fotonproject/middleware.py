class TokenAuthMiddleware:
    def __init__(self, get_response=None):
        self.get_response = get_response

    

    def __call__(self, request):
        token = request.COOKIES.get('auth_token')
        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Token {token}'
        response = self.get_response(request)
        return response