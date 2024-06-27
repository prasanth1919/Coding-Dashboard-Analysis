from django.db import models
from django.contrib.auth.models import AbstractUser,Group,Permission

class CustomUser(AbstractUser):
    leetcode_username = models.CharField(max_length=100, blank=True, null=True)
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # specify a related_name here
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions '
                   'granted to each of their groups.'),
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # specify a related_name here
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser',
    )
    def _str_(self):
        return self.username