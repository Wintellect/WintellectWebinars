from pypi_vm.services import user_service
from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase


class AccountHomeViewModel(ViewModelBase):
    def __init__(self):
        super().__init__()

        self.user = user_service.find_user_by_id(self.user_id)
