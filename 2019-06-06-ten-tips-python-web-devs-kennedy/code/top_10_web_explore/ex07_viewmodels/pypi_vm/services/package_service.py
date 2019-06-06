from typing import List, Optional

# from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy.orm import Session, subqueryload

from pypi_vm.data.maintainers import Maintainer
from pypi_vm.data.users import User
from pypi_vm.data.db_session import DbSession
from pypi_vm.data.packages import Package
from pypi_vm.data.releases import Release


def package_count() -> int:
    session: Session = DbSession.factory()
    try:
        return session.query(Package).count()
    finally:
        session.close()


def release_count() -> int:
    session: Session = DbSession.factory()
    try:
        return session.query(Release).count()
    finally:
        session.close()


def latest_releases(limit=10) -> List[Package]:
    session: Session = DbSession.factory()

    releases = session.query(Release) \
        .order_by(Release.created_date.desc()) \
        .limit(limit * 2)

    packages_in_order = [r.package_id for r in releases]
    package_ids = set(packages_in_order)

    packages = {p.id: p for p in session.query(Package).filter(Package.id.in_(package_ids))}

    session.close()

    results = []
    for r in releases:
        if len(results) >= limit:
            break

        results.append(packages[r.package_id])

    return results


def find_package_by_name(package_name: str) -> Optional[Package]:
    session: Session = DbSession.factory()

    # .options(subqueryload(Package.releases))
    try:
        package = session.query(Package) \
            .filter(Package.id == package_name) \
            .options(subqueryload(Package.releases)) \
            .first()
        if package:
            # noinspection PyUnusedLocal
            devnull = package.releases

        return package
    finally:
        session.close()


def all_packages(limit: int) -> List[Package]:
    session: Session = DbSession.factory()
    try:
        return list(session.query(Package).limit(limit))
    finally:
        session.close()


def maintainers_for_packages(package_name: str) -> List[Maintainer]:
    session: Session = DbSession.factory()
    try:
        user_ids = [
            r.user_id
            for r in session.query(Maintainer).filter(Maintainer.package_id == package_name)
        ]
        return list(session.query(User).filter(User.id.in_(user_ids)))
    finally:
        session.close()
