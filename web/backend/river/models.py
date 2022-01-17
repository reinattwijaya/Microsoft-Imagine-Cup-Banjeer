from django.db import models

# Create your models here.

class RiverNameAdvice(models.Model):
    name = models.CharField(max_length=200)
    advice = models.CharField(max_length=200)