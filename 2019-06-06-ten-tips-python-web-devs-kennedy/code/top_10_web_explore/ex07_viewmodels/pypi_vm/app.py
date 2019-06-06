import os
# import traceback

import flask
from pypi_vm.data.db_session import DbSession

app = flask.Flask(__name__)
__configured = False


def main():
    configure_app()
    app.run(host='localhost', port=5001, debug=True)


def configure_app():
    global __configured

    # print("Calling configure_app, state: {}".format(__configured))
    # for line in traceback.format_stack():
    #     print(line.strip())

    if __configured:
        return

    __configured = True

    app.config.from_object('pypi_vm.config.DevelopmentConfig')
    register_blueprints()
    init_db()


def register_blueprints():
    import pypi_vm.views.home_view as home
    import pypi_vm.views.seo_view as seo
    import pypi_vm.views.packages_view as packages
    import pypi_vm.views.account_view as account
    import pypi_vm.views.cms_view as cms

    print("Adding blueprints")

    app.register_blueprint(home.blueprint)
    app.register_blueprint(seo.blueprint)
    app.register_blueprint(packages.blueprint)
    app.register_blueprint(account.blueprint)
    app.register_blueprint(cms.blueprint)


def init_db():
    db_file = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            'db',
            'pypi.sqlite'
        ))
    DbSession.global_init(db_file)


configure_app()

if __name__ == '__main__':
    main()
