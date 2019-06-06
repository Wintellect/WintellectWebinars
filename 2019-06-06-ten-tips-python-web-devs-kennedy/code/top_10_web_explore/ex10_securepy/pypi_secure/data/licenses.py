import datetime
import sqlalchemy
from pypi_secure.data.modelbase import SqlAlchemyBase


class License(SqlAlchemyBase):
    __tablename__ = 'licenses'

    id: str = sqlalchemy.Column(sqlalchemy.String, primary_key=True)
    created_date: datetime.datetime = sqlalchemy.Column(sqlalchemy.DateTime, default=datetime.datetime.now, index=True)
    description: str = sqlalchemy.Column(sqlalchemy.String)
