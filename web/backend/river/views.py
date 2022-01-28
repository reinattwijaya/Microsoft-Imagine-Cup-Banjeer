from .serializers import RiverSerializer 
from rest_framework import viewsets, generics  
from .models import RiverNameAdvice      
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class RiverView(viewsets.ModelViewSet):

    queryset = RiverNameAdvice.objects.all()
    serializer_class = RiverSerializer
    filter_backends = (filters.SearchFilter, )
    search_fields = ['name']

class MyAPIView(generics.ListAPIView):

    @classmethod
    def get_extra_actions(cls):
        return []

#...
