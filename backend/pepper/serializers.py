from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Issue, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'issue',
            'date',
            'author',
            'content'
        )

class IssueSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(required=False, many=True)
    class Meta:
        model = Issue
        fields = (
            'id',
            'title',
            'description',
            'completed',
            'assignee',
            'priority',
            'reporter',
            'date',
            'comments',
        )


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(max_length=32, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password'
        )
