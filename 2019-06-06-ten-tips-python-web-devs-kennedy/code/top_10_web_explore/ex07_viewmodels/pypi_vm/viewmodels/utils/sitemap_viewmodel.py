import flask

from pypi_vm.services import package_service
from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase


class SiteMapViewModel(ViewModelBase):
    def __init__(self, limit: int):
        super().__init__()
        self.packages = package_service.all_packages(limit)
        self.last_updated_text = "2018-07-15"
        self.site = "{}://{}".format(flask.request.scheme, flask.request.host)
