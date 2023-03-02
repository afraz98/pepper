from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueSerializer, UserSerializer

# Models
from .models import Issue, Comment
from django.contrib.auth.models import User


# Create your views here.


class IssueView(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

