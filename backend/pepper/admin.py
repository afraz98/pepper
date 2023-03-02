from django.contrib import admin
from .models import Issue, Comment

# Register your models here.
class IssueAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description',
        'completed',
        'assignee',
        'priority',
        'reporter',
        'date',
    )

class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'issue',
        'date',
        'author',
        'content',
    )

admin.site.register(Issue, IssueAdmin)
admin.site.register(Comment, CommentAdmin)