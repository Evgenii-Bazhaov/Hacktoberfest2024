from django.shortcuts import render , get_object_or_404
from item.models import Item
from django.contrib.auth.decorators import login_required
# Create your views here.


@login_required
def index(request):
    items = Item.objects.filter(created_by=request.user)
    
    return render(request ,'dashboard/index.html' , {
        'items':items
    })
    
    



