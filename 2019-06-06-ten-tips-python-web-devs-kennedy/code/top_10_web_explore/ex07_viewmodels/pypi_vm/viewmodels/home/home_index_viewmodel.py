from pypi_vm.services import user_service, package_service
from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase


class HomeIndexViewModel(ViewModelBase):
    def __init__(self):
        super().__init__()

        self.packages = package_service.latest_releases()
        self.package_count = package_service.package_count()
        self.release_count = package_service.release_count()
        self.user_count = user_service.user_count()
