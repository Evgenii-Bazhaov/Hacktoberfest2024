from django.contrib import admin
from django.urls import path , include
# from core import views
# this is for static images
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include('core.urls')),
    path('items/',  include('item.urls')),
    path('inbox/',  include('conversation.urls')),
    path("dashboard/",include('dashboard.urls'))
] + static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)
