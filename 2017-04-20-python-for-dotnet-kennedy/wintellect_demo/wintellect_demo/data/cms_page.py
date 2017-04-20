import datetime
import uuid

import sqlalchemy

from wintellect_demo.data.modelbase import SqlAlchemyBase


class CmsPage(SqlAlchemyBase):
    __tablename__ = 'CMSPage'

    url = sqlalchemy.Column(sqlalchemy.String, primary_key=True)
    created_date = sqlalchemy.Column(sqlalchemy.DateTime,
                                     default=datetime.datetime.now)
    html = sqlalchemy.Column(sqlalchemy.String)
    is_redirect = sqlalchemy.Column(sqlalchemy.Boolean, default=False)
    redirect_url = sqlalchemy.Column(sqlalchemy.String)
