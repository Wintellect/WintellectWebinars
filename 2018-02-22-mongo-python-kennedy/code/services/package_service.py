from typing import Optional, List

from bson import ObjectId

from data.downloads import Download
from data.packages import Package
from data.release_history import ReleaseHistory
from data.users import User


class PackageService:

    @classmethod
    def find_package_by_name(cls, name: str) -> Optional[Package]:
        package = Package.objects(name=name).first()
        return package

    @classmethod
    def latest_package_release(cls, package: Package) -> Optional[ReleaseHistory]:
        if not package:
            return None

        release = ReleaseHistory \
            .objects(package_id=package.id) \
            .order_by('-created') \
            .first()

        return release

    @classmethod
    def popular_packages(cls, limit: int) -> List[Package]:
        packages = Package.objects() \
            .order_by('-total_downloads') \
            .limit(limit) \
            .all()

        return list(packages)

    @classmethod
    def maintainers(cls, package: Package) -> List[User]:
        users = User.objects(id__in=package.maintainers).all()

        return list(users)

    @classmethod
    def package_count(cls):
        return Package.objects().count()

    @classmethod
    def user_count(cls):
        return User.objects().count()

    @classmethod
    def release_count(cls):
        return ReleaseHistory.objects().count()

    @classmethod
    def download_count(cls):
        return Download.objects().count()
