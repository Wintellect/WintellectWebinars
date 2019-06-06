import flask

from pypi_vm.infrastructure.view_modifiers import response
from pypi_vm.viewmodels.packages.package_details_viewmodel import PackageDetailsViewModel
from pypi_vm.viewmodels.packages.popular_viewmodel import PopularPackageViewModel

blueprint = flask.Blueprint('packages', __name__, template_folder='templates')


@blueprint.route("/project/<package_name>")
@response(template_file='packages/details.html')
def details(package_name: str):
    vm = PackageDetailsViewModel(package_name)
    if not vm.package:
        flask.abort(404)

    return vm.to_dict()


@blueprint.route("/<int:num>")
@response(template_file='packages/popular.html')
def popular(num: int):
    vm = PopularPackageViewModel(num)
    if not (1 <= vm.num or vm.num <= 10):
        flask.abort(404)

    return vm.to_dict()
