from django.db import models

# Create your models here.

class RiverNameAdvice(models.Model):
    name = models.CharField(max_length=200)
    condition = models.CharField(max_length=100, default="bad")
    advice = models.CharField(max_length=200)

    @classmethod
    def get_extra_actions(cls):
        return []