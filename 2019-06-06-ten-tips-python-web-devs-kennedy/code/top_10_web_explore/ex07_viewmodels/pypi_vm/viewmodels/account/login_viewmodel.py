from pypi_vm.services import user_service
from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase


class LoginViewModel(ViewModelBase):
    def __init__(self):
        super().__init__()

        self.email = self.request_dict.get('email')
        self.password = self.request_dict.get('password')
        self.user = None

        if self.email:
            self.email = self.email.strip().lower()

        if self.email and self.password:
            self.user = user_service.login_user(self.email, self.password)

    def validate(self):
        if not self.email:
            self.error = "Your email is required."
        elif not self.password:
            self.error = 'Your password is empty.'
        elif not self.user:
            self.error = 'The user could not found or the password is incorrect.'
