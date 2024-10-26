from rest_framework import serializers


from .models import plan

class planserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=plan
        fields=['goal','name','age','weight']

