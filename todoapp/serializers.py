from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import TODO, Project


class ProjectHyperlinkedModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TODOHyperlinkedModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
