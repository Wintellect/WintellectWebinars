import pypi_secure.data.db_session as db_session
from pypi_secure.data.users import User


def get_user_count() -> int:
    session = db_session.create_session()
    return session.query(User).count()
