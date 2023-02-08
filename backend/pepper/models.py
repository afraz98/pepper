from django.db import models

ISSUE_TITLE_LENGTH = 120


class Issue(models.Model):
    """
    Class describing Issue object.
    Params:
        title (str): Issue title (max 120 characters)
        description (str): Issue description
        completed (bool): Issue completion status
        assignee (str): User assigned to issue in question
        priority (str): Issue priority
        reporter (str): Issue reporter
        date (str): Issue date
    """
    title = models.CharField(max_length=ISSUE_TITLE_LENGTH)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    assignee = models.TextField()
    priority = models.TextField()
    reporter = models.TextField()
    date = models.TextField()
    pass

