from django.urls import path, include

accounts_urlpatterns = [
    path(r'api/', include('djoser.urls')),
    path(r'api/', include('djoser.urls.authtoken')),
]