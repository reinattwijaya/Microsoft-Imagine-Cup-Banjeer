from django.http import JsonResponse

from django.http import HttpResponse

from django.shortcuts import render
from .serializers import RiverSerializer 
from rest_framework import viewsets      
from .models import RiverNameAdvice                

class RiverView(viewsets.ModelViewSet):  
    serializer_class = RiverSerializer   
    queryset = RiverNameAdvice.objects.all()   