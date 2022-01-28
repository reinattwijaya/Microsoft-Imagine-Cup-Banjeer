from .serializer import ImageSerializer
from rest_framework import viewsets, generics  
from .models import Image     
from django.http import HttpResponse
import json
  
class ImageViewSet(generics.ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        file = request.data['file']
        image = Image.objects.create(image=file)
        return HttpResponse(json.dumps({'message': "Uploaded"}), status=200)