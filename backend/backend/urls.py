from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pepper import views
from accounts.urls import accounts_urlpatterns

router = routers.DefaultRouter()
router.register(r'issues', views.IssueView, 'issue')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]


urlpatterns += accounts_urlpatterns