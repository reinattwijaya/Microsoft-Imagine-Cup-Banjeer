from django.http import HttpResponse
from rest_framework.views import APIView
from .ml import * 

class Image(APIView):
    def post(self, request):
        file    = request.data['image']
        gabung  = pred_img(file, './image/weight.pth')
        resp    = HttpResponse(content_type = 'image/jpg')
        gabung.save(resp, 'JPEG') 
        return resp