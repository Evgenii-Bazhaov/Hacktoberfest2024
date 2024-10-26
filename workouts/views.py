from django.shortcuts import render
from .serializers import planserializer
from .models import plan
from rest_framework import viewsets,filters

# Create your views here.

class PlanView(viewsets.ModelViewSet):
    queryset=plan.objects.all()
    serializer_class=planserializer
    

    def get_queryset(self):
        queryset = super().get_queryset()
        goal = self.request.query_params.get('search', None)
        if goal is not None:
            queryset = queryset.filter(goal__icontains=goal)
        return queryset
