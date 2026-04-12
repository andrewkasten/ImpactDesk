from django.http import HttpResponse


class CorsMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "OPTIONS":
            response = HttpResponse()
            response.status_code = 200
        else:
            response = self.get_response(request)
        response['Access-Control-Allow-Origin'] = "*"
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response["Access-Control-Allow-Methods"] = "DELETE, POST, GET, PUT, OPTIONS"
        return response