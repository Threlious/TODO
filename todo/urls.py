"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from authors.views import UserCustomViewSet
from todoapp.views import TODOModelViewSet, ProjectModelViewSet

router = DefaultRouter()
router.register('authors', UserCustomViewSet)
router.register('todos', TODOModelViewSet)
router.register('projects', ProjectModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Users',
        default_version='v2',
        description='Documentations',
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ]
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),

    path('api/users/v1', include('userapp.urls', namespace='v1')),
    path('api/users/v2', include('userapp.urls', namespace='v2')),

    path('swagger<str:format>/', schema_view.without_ui()),
    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),

    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
