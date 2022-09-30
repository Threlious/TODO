from django.db import models

from library.authors.models import User


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    repository_link = models.CharField(max_length=100)
    users = models.ManyToManyField(User, null=True, blank=True)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField()
