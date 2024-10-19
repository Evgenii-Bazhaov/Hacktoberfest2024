from django.shortcuts import render, get_object_or_404, redirect, HttpResponse
from .models import Item , Category
from django.db.models import Q
from django.contrib.auth.decorators import login_required

from .forms import NewItemForm ,EditItemForm


def items(request):
    
    query = request.GET.get('query', '')
    categories = Category.objects.all()
    category_id = request.GET.get('category' ,0)
    items = Item.objects.filter(is_sold=False)

    if category_id:
        items = items.filter(category_id=category_id)



    if query:
        # name_icontains where i is insensitive
        items = items.filter(Q(name__icontains=query) | Q(description__icontains=query))

        

    return render(request , 'item/items.html', {
        'items': items,
        'query':query,
        'categories':categories,
        'category_id' :int(category_id),
    })

# Create your views here.
# pk = primarykey
def details(request, pk):
    item = get_object_or_404(Item, pk=pk)
    realted_items = Item.objects.filter(
        category=item.category, is_sold=False).exclude(pk=pk)[0:3]

    return render(request, "item/detail.html", {
        'item': item,
        'realted_items': realted_items
    })


@login_required
def new(request):
    if  request.method == 'POST':
        forms = NewItemForm(request.POST, request.FILES)

        if forms.is_valid():
            item = forms.save(commit=False)
            item.created_by = request.user
            item.save()

            return redirect('item:detail', pk=item.id)

    else:
        forms = NewItemForm()

        return render(request, 'item/form.html', {
            'form': forms,
            'title': 'New item'
        })
        
@login_required
def delete(request ,pk):
    item = get_object_or_404(Item , pk=pk, created_by=request.user)
    item.delete()
    
    return redirect('dashboard:index')


@login_required
def edit(request , pk):
    
    item = get_object_or_404(Item , pk=pk, created_by=request.user)
    
    if  request.method == 'POST':
        forms = EditItemForm(request.POST, request.FILES, instance=item)

        if forms.is_valid():
            forms.save()

            return redirect('item:detail', pk=item.id)

    else:
        forms = EditItemForm(instance=item)

        return render(request, 'item/form.html', {
            'form': forms,
            'title': 'Edit item'
        })