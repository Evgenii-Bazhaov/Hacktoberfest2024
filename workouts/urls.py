# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlanView

router = DefaultRouter()
router.register(r'plans', PlanView)

urlpatterns = [
    path('', include(router.urls)),
]
