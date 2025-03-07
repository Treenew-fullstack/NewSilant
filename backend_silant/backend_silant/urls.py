"""
URL configuration for backend_silant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView
from silant.views import CustomUserDetailsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/', include('silant.urls')),
    path('api/v1/login/', LoginView.as_view(), name='rest_login'),
    path('api/v1/logout/', LogoutView.as_view(), name='rest_logout'),
    path('api/v1/user/', CustomUserDetailsView.as_view(), name='user_details'),
]
