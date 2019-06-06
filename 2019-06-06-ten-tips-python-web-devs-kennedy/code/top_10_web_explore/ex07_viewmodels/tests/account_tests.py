import unittest.mock
# noinspection PyUnresolvedReferences
from test_client import client, flask_app


def test_empty(client):
    r = client.get('/')
    # print("Got {}".format(r))
    assert r is not None


def test_register_validation_valid():
    # 3 A's of test: Arrange, Act, then Assert

    # Arrange
    from pypi_vm.viewmodels.account.register_viewmodel import RegisterViewModel
    form_data = {
        'name': 'Michael',
        'email': 'michael@talkpython.fm',
        'password': 'a'
    }

    with flask_app.app.test_request_context(path='/account/register', data=form_data):
        vm = RegisterViewModel()

        # Act
        target = 'pypi_vm.services.user_service.find_user_by_email'
        with unittest.mock.patch(target, return_value=None):
            vm.validate()

        # Assert:
        assert vm.error is None


def test_register_validation_existing_user():
    # Arrange
    from pypi_vm.viewmodels.account.register_viewmodel import RegisterViewModel
    from pypi_vm.data.users import User

    form_data = {
        'name': 'Michael',
        'email': 'michael@talkpython.fm',
        'password': 'a'
    }

    with flask_app.app.test_request_context(path='/account/register', data=form_data):
        vm = RegisterViewModel()

    # Act
    target = 'pypi_vm.services.user_service.find_user_by_email'
    with unittest.mock.patch(target, return_value=User()):
        vm.validate()

    # Assert:
    assert vm.error is not None
    assert 'exist' in vm.error


def test_register_validation_no_email():
    # Arrange
    from pypi_vm.viewmodels.account.register_viewmodel import RegisterViewModel
    form_data = {
        'email': '',
        'password': 'a'
    }
    with flask_app.app.test_request_context(path='/account/register', data=form_data):
        vm = RegisterViewModel()

        # Act
        vm.validate()

    # Assert:
    assert vm.error is not None
    assert 'email' in vm.error
