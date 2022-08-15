from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets

from .models import User
from .serializers import UserModelSerializer


class UserCustomViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = UserModelSerializer
