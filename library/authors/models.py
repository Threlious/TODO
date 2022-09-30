from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    birthday_year = models.PositiveIntegerField(null=True)
    email = models.CharField(max_length=64, unique=True)
