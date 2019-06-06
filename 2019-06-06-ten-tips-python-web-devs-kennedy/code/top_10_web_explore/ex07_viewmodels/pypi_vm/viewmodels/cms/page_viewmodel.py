from pypi_vm.viewmodels.shared.viewmodel_base import ViewModelBase

fake_db = {
    '/company/history': {
        'page_title': 'Company history',
        'page_details': 'Details about company history...',
    },
    '/company/employees': {
        'page_title': 'Our team',
        'page_details': 'Details about company employees ...',
    },
}


class PageViewModel(ViewModelBase):
    def __init__(self, sub_path: str):
        super().__init__()

        self.sub_path = sub_path
        self.sub_url = None
        if self.sub_path:
            self.sub_url = '/' + self.sub_path.lstrip('/')

        self.page = fake_db.get(self.sub_url)
