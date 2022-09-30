from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer

from .views import UserCustomViewSet
from .models import User
from library.todoapp.models import Project


class TestUserCustomViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/authors/'
        self.author_dict = {'username': 'Larry', 'first_name': 'Ryan', 'last_name': 'Potter', 'email': 'ryan@mail.ru'}
        self.author_dict_fake = {'username': 'Larry_fake', 'first_name': 'Ryan', 'last_name': 'Potter',
                                 'email': 'ryan@mail.ru'}
        self.format = 'json'
        self.login = 'admin'
        self.password = 'qwzxas12'
        self.admin = User.objects.create_superuser(self.login, 'admin@mail.ru', self.password)
        self.user = User.objects.create(**self.author_dict)

    def test_factory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.author_dict, format=self.format)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_detail(self):
        client = APIClient()
        response = client.get(f'{self.url}{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_update_guest(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.user.id}/', **self.author_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_update_admin(self):
        client = APIClient()
        client.login(username=self.login, password=self.password)
        response = client.put(f'{self.url}{self.user.id}/', self.author_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, self.author_dict_fake.get('username'))
        client.logout()

    def tearDown(self) -> None:
        pass


class TestMath(APISimpleTestCase):
    def test_square(self):
        import math
        response = math.sqrt(4)
        self.assertEqual(response, 2)


class TestProject(APITestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.author_dict = {'username': 'Larry', 'first_name': 'Ryan', 'last_name': 'Potter', 'email': 'ryan@mail.ru'}
        self.author_dict_fake = {'username': 'Larry_fake', 'first_name': 'Ryan', 'last_name': 'Potter',
                                 'email': 'ryan@mail.ru'}

        self.format = 'json'
        self.login = 'admin'
        self.password = 'qwzxas12'

        self.admin = User.objects.create_superuser(self.login, 'admin@mail.ru', self.password)
        self.user = User.objects.create(**self.author_dict)
        self.project_dict = {'name': 'test', 'repository_link': 'link'}
        self.project_dict_fake = {'name': 'test_fake', 'repository_link': 'link'}
        self.project = Project.objects.create(**self.project_dict)
        self.project.users.add(self.user)
        self.project.save()

    def test_api_test_case_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_test_case_update_admin(self):
        self.client.login(username=self.login, password=self.password)
        response = self.client.put(f'{self.url}{self.project.id}/', self.project_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertEqual(self.project.name, self.project_dict_fake.get('name'))
        self.client.logout()

    def test_mixer(self):
        project = mixer.blend(Project)
        self.client.login(username=self.login, password=self.password)
        response = self.client.put(f'{self.url}{project.id}/', self.project_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project.refresh_from_db()
        self.assertEqual(project.name, self.project_dict_fake.get('name'))
        self.client.logout()

    def tearDown(self) -> None:
        pass
