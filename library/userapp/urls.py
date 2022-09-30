from django.urls import path

from library.userapp.views import UserListAPIView

app_name = 'userapp'

urlpatterns = [
    path('', UserListAPIView.as_view()),
]
