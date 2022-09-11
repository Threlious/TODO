from django.shortcuts import render
from rest_framework.permissions import BasePermission, AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets

from .models import User
from .serializers import UserModelSerializer


class SuperUserOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


class UserCustomViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, mixins.CreateModelMixin):
    queryset = User.objects.all().order_by('username')
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = UserModelSerializer
