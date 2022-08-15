from rest_framework.viewsets import ModelViewSet

from .models import TODO, Project
from .serializers import TODOHyperlinkedModelSerializer, ProjectHyperlinkedModelSerializer


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkedModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedModelSerializer
