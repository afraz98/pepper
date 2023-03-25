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
    
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.assignee = validated_data.get('assignee', instance.assignee)
        instance.priority = validated_data.get('prioirty', instance.priority)
        instance.reporter = validated_data.get('reporter', instance.reporter)
        instance.date = validated_data.get('date', instance.date)
        # instance.comments = validated_data.get('comments', instance.comments.set())
        instance.save()
        return instance


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
