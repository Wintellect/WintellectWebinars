import flask
from flask import Response

from pypi_vm.infrastructure import cookie_auth
from pypi_vm.infrastructure.view_modifiers import response
from pypi_vm.services import user_service
from pypi_vm.viewmodels.account.account_home_viewmodel import AccountHomeViewModel
from pypi_vm.viewmodels.account.login_viewmodel import LoginViewModel
from pypi_vm.viewmodels.account.register_viewmodel import RegisterViewModel

blueprint = flask.Blueprint('account', __name__, template_folder='templates')


# ################### INDEX #################################


@blueprint.route('/account')
@response(template_file='account/index.html')
def index():
    vm = AccountHomeViewModel()
    if not vm.user:
        return flask.redirect('/account/login')

    return vm.to_dict()


# ################### REGISTER #################################

@blueprint.route('/account/register', methods=['GET'])
@response(template_file='account/register.html')
def register_get():
    vm = RegisterViewModel()
    return vm.to_dict()


@blueprint.route('/account/register', methods=['POST'])
@response(template_file='account/register.html')
def register_post():
    vm = RegisterViewModel()
    vm.validate()

    if vm.error:
        return vm.to_dict()

    # create user
    user = user_service.create_user(vm.email, vm.name, vm.password)
    response_val: Response = flask.make_response()
    cookie_auth.set_auth(response_val, user.id)

    return flask.redirect('/account', Response=response_val)


# ################### LOGIN #################################

@blueprint.route('/account/login', methods=['GET'])
@response(template_file='account/login.html')
def login_get():
    vm = LoginViewModel()
    return vm.to_dict()


@blueprint.route('/account/login', methods=['POST'])
@response(template_file='account/login.html')
def login_post():
    vm = LoginViewModel()
    vm.validate()

    if vm.error:
        return vm.to_dict()

    headers = dict(Location='/account')
    response_val: Response = flask.Response(status=302, headers=headers)
    cookie_auth.set_auth(response_val, vm.user.id)

    return response_val


# ################### LOGOUT #################################

@blueprint.route('/account/logout')
def logout():
    headers = dict(Location='/')
    response_val: Response = flask.Response(status=302, headers=headers)

    cookie_auth.logout(response_val)

    return response_val
