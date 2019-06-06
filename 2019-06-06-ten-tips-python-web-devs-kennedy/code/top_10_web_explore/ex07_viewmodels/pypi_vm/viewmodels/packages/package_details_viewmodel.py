from pypi_vm.data.releases import Release
from pypi_vm.services import package_service
from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase


class PackageDetailsViewModel(ViewModelBase):
    def __init__(self, package_name: str):
        super().__init__()

        self.package_name = package_name
        self.package = package_service.find_package_by_name(self.package_name)

        self.latest_version = '0.0.0'
        self.latest_release = None

        if self.package and self.package.releases:
            self.latest_release: Release = self.package.releases[0]
            self.latest_version = '{}.{}.{}'.format(
                self.latest_release.major_ver,
                self.latest_release.minor_ver,
                self.latest_release.build_ver
            )

        self.release_version = self.latest_version
        self.maintainers = package_service.maintainers_for_packages(package_name)
        self.is_latest = True
