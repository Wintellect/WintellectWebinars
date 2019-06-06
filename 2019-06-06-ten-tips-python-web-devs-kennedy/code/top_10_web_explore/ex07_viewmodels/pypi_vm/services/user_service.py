from typing import Optional

from sqlalchemy.orm import Session

from pypi_vm.data.db_session import DbSession
from pypi_vm.data.users import User
from passlib.handlers.sha2_crypt import sha512_crypt


def user_count() -> int:
    session: Session = DbSession.factory()
    try:
        return session.query(User).count()
    finally:
        session.close()


def create_user(email: str, name: str, password: str) -> User:
    user = User()
    user.name = name
    user.email = email.lower().strip()
    user.hashed_password = hash_text(password)

    session: Session = DbSession.factory()
    session.add(user)
    session.commit()
    session.close()

    return user


def hash_text(text: str) -> str:
    hashed_text = sha512_crypt.encrypt(text, rounds=150000)
    return hashed_text


def verify_hash(hashed_text: str, plain_text: str) -> bool:
    return sha512_crypt.verify(plain_text, hashed_text)


def login_user(email: str, password: str) -> Optional[User]:
    if not email:
        return None

    email = email.lower().strip()

    session: Session = DbSession.factory()
    user = session.query(User).filter(User.email == email).first()
    session.close()

    if not user:
        return None

    if not verify_hash(user.hashed_password, password):
        return None

    return user


def find_user_by_id(user_id: int) -> Optional[User]:
    session: Session = DbSession.factory()
    try:
        return session.query(User).filter(User.id == user_id).first()
    finally:
        session.close()


def find_user_by_email(email: str) -> Optional[User]:
    session: Session = DbSession.factory()
    try:
        return session.query(User).filter(User.email == email).first()
    finally:
        session.close()
