from django.db import models


class plan(models.Model):
    goal=models.CharField(max_length=50)
    name=models.CharField(max_length=50)
    age=models.IntegerField()
    weight=models.IntegerField()

def __str__(self):
    return self.name
    


    

