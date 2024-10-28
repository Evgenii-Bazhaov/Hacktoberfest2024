from django.urls import path
from . import views

app_name = 'item'

urlpatterns = [
    path('', views.items, name="items"),
    path('<int:pk>/' , views.details , name='detail'),
    path('new/' , views.new, name='new'),
    path('<int:pk>/delete/' , views.delete , name='delete'),
    path('<int:pk>/edit/' , views.edit , name='edit'),
    
    
]
