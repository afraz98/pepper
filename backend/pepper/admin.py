from django.contrib import admin
from .models import Issue

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


admin.site.register(Issue, IssueAdmin)