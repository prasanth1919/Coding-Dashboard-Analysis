from django.urls import path
from .views import UserRegistrationView

urlpatterns = [
    path('P:\vscode\Software\software project\project-codereye\src\components\Signup.js', UserRegistrationView.as_view(), name='signup'),
]