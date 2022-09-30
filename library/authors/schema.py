import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from library.todoapp.models import TODO, Project
from .models import User


# class UsersType(DjangoObjectType):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class Query(ObjectType):
#     all_users = graphene.List(UsersType)
#
#     @staticmethod
#     def resolve_all_users(self, info):
#         return User.objects.all()
#
#
# schema = graphene.Schema(query=Query)

# ________________________________________________________________________

class UsersType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TodosType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(ObjectType):
    all_users = graphene.List(UsersType)
    all_todos = graphene.List(TodosType)
    all_projects = graphene.List(ProjectType)

    @staticmethod
    def resolve_all_users(self, info):
        return User.objects.all()

    @staticmethod
    def resolve_all_todos(self, info):
        return TODO.objects.all()

    @staticmethod
    def resolve_all_projects(self, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)

# ___________________________________________________________________
