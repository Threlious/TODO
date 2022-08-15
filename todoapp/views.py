from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .models import TODO, Project
from .serializers import TODOHyperlinkedModelSerializer, ProjectHyperlinkedModelSerializer
from .filters import ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkedModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_fields = ['project', ]

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.active = False
        todo.save()
        serializer = TODOHyperlinkedModelSerializer(todo, context={'request': request})
        return Response(serializer.data)


class ProjectModelViewSet(ModelViewSet):
    pagination_class = ProjectLimitOffsetPagination
    queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedModelSerializer
    filterset_class = ProjectFilter
