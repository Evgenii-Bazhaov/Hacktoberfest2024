from django.shortcuts import render , redirect
from item.models import Category , Item
from django.contrib.auth import logout
# Create your views here.

from .forms import SignupForm

def index(request):
    # this [0:6] is same as slice where the data will filter upto 6
    items = Item.objects.filter(is_sold=False)[0:6]
    categories = Category.objects.all()
    
    
    return render(request , "core/index.html" , {
            'categories' : categories,
            'items': items,
    })




def contact(request):
    return render(request,'core/contact.html')


def Signup(request):
    
    if request.method == 'POST':
        form = SignupForm(request.POST)

        if form.is_valid():
            form.save()
            
            return redirect('/login/')
        # if form.is_valid():
        #     password = form.cleaned_data['password1']
        #     confirm_password = form.cleaned_data['password2']
            
        #     if password != confirm_password:
        #         form.add_error('confirm_password', 'Password and confirm password must match.')
        #     else:
        #         form.save()
        #         return redirect('/login/')
            
    else:
        form = SignupForm()
    
    return render(request , 'core/signup.html' , {
        'form':form
    })
    
def logout_view(request):
    logout(request)
    return redirect('/login/')