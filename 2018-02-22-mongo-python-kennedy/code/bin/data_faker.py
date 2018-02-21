import datetime

from faker import Faker
import random

from data import mongo_setup
from data.downloads import Download
from data.packages import Package
from data.release_health import ReleaseHealth
from data.release_history import ReleaseHistory
from data.users import User

user_count = 20_000
package_count = 50_000
release_count = package_count * 5
download_count = package_count * 10

topic_list = [
    'web', 'data', 'science', 'packaging', 'it', 'devops', 'perf',
    'action', 'guis', 'platform', 'cloud', 'db', 'files', 'app',
    'coverage', 'testing', 'modes', 'editor', 'extension', 'async', 'pip',
    'images', 'machine learning', 'clis', 'sorting', 'querying', 'compression', 'other',
]

language_list = [
    'Python 3.6', 'Python 3.5', 'Python 2.7', 'CPython', 'PyPy', 'Cython', 'IronPython', 'Jython'
]


def main():
    print("Fake data adder script")
    mongo_setup.global_init('pypi')

    t0 = datetime.datetime.now()

    if User.objects().count() > 0:
        print("Users exists, skipping...", flush=True)
        users = list(User.objects())
    else:
        users = build_users()

    if Package.objects().count() > 0:
        print("Packages exists, skipping...", flush=True)
        packages = list(Package.objects())
    else:
        packages = build_packages(users)

    if ReleaseHistory.objects().count() > 0:
        print("Releases exists, skipping...", flush=True)
        releases = list(ReleaseHistory.objects())
    else:
        releases = build_releases(packages)

    if Download.objects().count() > 0:
        print("Downloads exists, skipping...", flush=True)
        downloads = list(Download.objects())
        # sync_downloads(downloads)
    else:
        downloads = build_downloads(releases, packages)
        print("Syncing download count to packages ...", flush=True)
        # sync_downloads(downloads)

    t1 = datetime.datetime.now()
    dt = t1 - t0

    print(f"Created {user_count:,} users, {package_count:,} packages, "
          f"{release_count:,} releases, {download_count:,} downloads.")
    print(f"Total time: {dt.total_seconds():,} sec.")


def sync_downloads(downloads):
    for d in downloads:
        Package.objects(id=d.package_id).update_one(inc__total_downloads=1)


def fake_ip():
    return "{}.{}.{}.{}".format(
        random.randint(1, 255),
        random.randint(1, 255),
        random.randint(1, 255),
        random.randint(1, 255)
    )


def fake_version():
    return "{}.{}.{}".format(
        random.randint(1, 10),
        random.randint(1, 10),
        random.randint(1, 100)
    )


def build_users():
    users = []
    fake = Faker()
    print(f"Creating {user_count:,} fake users...", flush=True)
    for _ in range(0, user_count):
        u = User()

        u.name = fake.name()
        u.email = fake.email()

        users.append(u)

    User.objects().insert(users)
    return list(User.objects())


def build_packages(users):
    packages = []
    print(f"Creating {package_count:,} fake packages...", flush=True)
    for i in range(0, package_count):
        maintainers = []
        for _ in range(0, random.randint(1, 5)):
            u = random.choice(users)
            maintainers.append(u.id)

        p = Package()
        p.name = f"Package{i+1}"
        p.maintainers.extend(maintainers)

        packages.append(p)

    Package.objects().insert(packages)

    return list(Package.objects())


def build_releases(packages):
    releases = []
    fake = Faker()
    print(f"Creating {release_count:,} fake releases...", flush=True)
    for _ in range(0, release_count):
        topics = list(set((random.choice(topic_list) for _ in range(0, random.randint(1, 5)))))
        langs = list(set((random.choice(language_list) for _ in range(0, random.randint(1, 5)))))

        r = ReleaseHistory()
        r.package_id = random.choice(packages).id
        r.version_number = fake_version()
        r.description = fake.text()
        r.topics.extend(topics)
        r.programming_languages.extend(langs)
        r.dependencies.extend(['requests', 'pymongo'])
        r.health = ReleaseHealth()
        r.health.ci = random.randint(0, 1) == 1
        r.health.health_index = random.random()
        r.health.coverage = random.random()

        releases.append(r)

    ReleaseHistory.objects().insert(releases)
    return list(ReleaseHistory.objects())


def build_downloads(releases, packages):
    package_lookup = {p.id: p for p in packages}
    packages_to_save = {}
    downloads = []
    print(f"Creating {download_count:,} fake downloads...", flush=True)
    for _ in range(0, download_count):
        r = random.choice(releases)
        p = package_lookup[r.package_id]
        p.total_downloads += 1
        packages_to_save[p.id] = p

        d = Download()
        d.package_id = r.package_id
        d.release_id = r.id
        d.client_ip = fake_ip()
        d.client_app = f"pip {fake_version()}"
        d.python_version = fake_version()

        downloads.append(d)

    Download.objects().insert(downloads)

    print("Updated {} packages with download count".format(len(packages_to_save)), flush=True)
    for p in packages_to_save.values():
        p.save()

    return list(Download.objects())


if __name__ == '__main__':
    main()
