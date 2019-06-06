import flask

from pypi_vm.infrastructure.view_modifiers import response
from pypi_vm.viewmodels.cms.page_viewmodel import PageViewModel

blueprint = flask.Blueprint('cms', __name__, template_folder='templates')


@blueprint.route('/<path:full_url>')
@response(template_file='cms/page.html')
def cms_page(full_url: str):
    vm = PageViewModel(full_url)
    if not vm.page:
        flask.abort(status=404)

    return vm.to_dict()
