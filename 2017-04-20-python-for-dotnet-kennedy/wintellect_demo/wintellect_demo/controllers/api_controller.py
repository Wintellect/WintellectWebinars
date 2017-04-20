import pyramid_handlers
from pyramid.response import Response

from wintellect_demo.controllers.base_controller import BaseController


class APIController(BaseController):
    @pyramid_handlers.action(renderer='json', request_method='GET')
    def list(self):
        raise Exception("Boo")
        try:
            data = [
                {'id': 1, 'name': "First thing"},
                {'id': 2, 'name': "2nd thing"},
                {'id': 3, 'name': "3rd thing"},
                {'id': 4, 'name': "4th thing"},
            ]

            return data
        except Exception as x:
            return Response("That broke: {}".format(x), 500)
