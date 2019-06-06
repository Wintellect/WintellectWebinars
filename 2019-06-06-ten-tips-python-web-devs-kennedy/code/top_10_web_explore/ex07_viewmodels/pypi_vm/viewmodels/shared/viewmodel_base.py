from typing import Optional, Any

import flask
from flask import Request

from pypi_vm.infrastructure import request_dict, cookie_auth


class ViewModelBase:
    def __init__(self):
        self.request: Request = flask.request
        self.request_dict = request_dict.create(self.request)
        self.error: Optional[str] = None
        self.user_id: int = cookie_auth.get_user_id_via_auth_cookie(self.request)
        self.name = "VM Name"
        self.stringify = self.stringify_func

    def to_dict(self):
        return self.__dict__

    @staticmethod
    def stringify_func(item: Optional[Any]) -> str:
        if not item:
            return ''

        return str(item)
