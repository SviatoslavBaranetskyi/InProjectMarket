from django.urls import path

from .views import SignUpView, SignInView, ProfileView

urlpatterns = [
    path('register', SignUpView.as_view(), name='register'),
    path('login', SignInView.as_view(), name='login'),
    path('profile', ProfileView.as_view(), name='profile'),
]