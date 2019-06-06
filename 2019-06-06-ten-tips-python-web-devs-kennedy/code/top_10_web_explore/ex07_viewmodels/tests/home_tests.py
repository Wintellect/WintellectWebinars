from flask import Response

from test_client import client, flask_app
from views import home_view


def test_homepage(client):
    r: Response = client.get('/')
    assert r.status_code == 200
    assert b'Find, install and publish Python packages' in r.data


def test_homepage_directly():
    with flask_app.app.test_request_context(path='/'):
        r: Response = home_view.index()

    assert r.status_code == 200
    # noinspection PyUnresolvedReferences
    assert len(r.model.get('packages')) > 0
