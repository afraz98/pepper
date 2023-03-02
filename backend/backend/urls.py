from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pepper import views


router = routers.DefaultRouter()
router.register(r'issues', views.IssueView, 'issue')
router.register(r'users', views.UserView, 'user')
router.register(r'comments', views.CommentView, 'comment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include("accounts.urls"))
]



