from rest_framework import serializers
from .models import RiverNameAdvice

class RiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiverNameAdvice
        fields = ('name', 'condition', 'advice')