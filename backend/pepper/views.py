from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import IssueSerializer, UserSerializer

# Models
from .models import Issue
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.authtoken.models import Token

# Create your views here.


class IssueView(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()


class UserCreate(APIView):
    """
    Creates the user.
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

