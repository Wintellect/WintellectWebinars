from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase


class PopularPackageViewModel(ViewModelBase):
    def __init__(self, num: int):
        super().__init__()
        self.num = num
        self.package_name = "The {}th most popular package".format(self.num)
