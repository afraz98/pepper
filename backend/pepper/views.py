from django.shortcuts import render
from rest_framework import viewsets
from .serializers import IssueSerializer
from .models import Issue

# Create your views here.


class IssueView(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()


