from typing import Optional, List

from bson import ObjectId

from data.downloads import Download
from data.packages import Package
from data.release_history import ReleaseHistory
from data.users import User


class PackageService:

    @classmethod
    def find_package_by_name(cls, name: str) -> Optional[Package]:
        # TODO: Implement
        return None

    @classmethod
    def latest_package_release(cls, package: Package) -> Optional[ReleaseHistory]:
        if not package:
            return None

        # TODO: Implement
        return None

    @classmethod
    def popular_packages(cls, limit: int) -> List[Package]:
        # TODO: Implement
        return None

    @classmethod
    def maintainers(cls, package: Package) -> List[User]:
        # TODO: Implement
        return None

    @classmethod
    def package_count(cls):
        # TODO: Implement
        return 0

    @classmethod
    def user_count(cls):
        # TODO: Implement
        return 0

    @classmethod
    def release_count(cls):
        # TODO: Implement
        return 0

    @classmethod
    def download_count(cls):
        # TODO: Implement
        return 0
