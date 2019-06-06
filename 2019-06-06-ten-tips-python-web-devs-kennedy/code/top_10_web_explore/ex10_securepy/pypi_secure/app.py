import os

import flask
import pypi_secure.data.db_session as db_session
from secure import SecureHeaders

secure_headers = SecureHeaders()

app = flask.Flask(__name__)


def main():
    register_blueprints()
    setup_db()
    app.run(debug=True, port=5005)


def setup_db():
    db_file = os.path.join(
        os.path.dirname(__file__),
        'db',
        'pypi.sqlite')

    db_session.global_init(db_file)


def register_blueprints():
    from pypi_secure.views import home_views
    from pypi_secure.views import package_views
    from pypi_secure.views import cms_views

    app.register_blueprint(package_views.blueprint)
    app.register_blueprint(home_views.blueprint)
    app.register_blueprint(cms_views.blueprint)


# @app.after_request
# def set_secure_headers(response):
#     secure_headers.flask(response)
#     return response


if __name__ == '__main__':
    main()
