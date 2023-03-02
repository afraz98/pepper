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
        comments (list): List of comments
    """
    title = models.CharField(max_length=ISSUE_TITLE_LENGTH)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    assignee = models.TextField()
    priority = models.TextField()
    reporter = models.TextField()
    date = models.TextField()
    comments = []


    class Meta:
        ordering = ['date']

    def __str__(self):
        return "Issue %s reported by %s on %s." % (self.title, self.reporter, self.date)
    pass

class Comment(models.Model):
    """
    Class describing Comment object.

    Params:
        issue (models.ForeignKey): Issue associated with comment
        date (str): Comment creation date
        content (str): Comment content
        author (str): Comment author
    """
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments') # Many-to-one relationship
    date = models.TextField()
    author = models.TextField()
    content = models.TextField()

    class Meta:
        ordering = ['date']

    def __str__(self):
        return "User %s created comment %s on %s." % (self.author, self.content, self.date)
    pass