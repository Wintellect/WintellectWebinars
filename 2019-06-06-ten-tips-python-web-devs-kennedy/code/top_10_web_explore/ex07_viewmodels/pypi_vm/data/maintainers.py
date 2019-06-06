import datetime

import sqlalchemy
from pypi_vm.data.modelbase import SqlAlchemyBase


class Maintainer(SqlAlchemyBase):
    __tablename__ = 'maintainers'

    user_id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    package_id = sqlalchemy.Column(sqlalchemy.String, primary_key=True)
    # date_added = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.datetime.now)
