import time

import bson

from data.packages import Package
from services.package_service import PackageService
import data.mongo_setup as mongo_setup


def main():
    mongo_setup.global_init('pypi')
    print_header()
    input_loop()


def input_loop():
    while True:

        print("What do you want to do?")
        val = input("[q]uery packages, view [d]ownloads, or e[x]it? ").lower().strip()
        if val == 'q':
            query_packages()
        elif val == 'd':
            view_downloads()
        elif val == 'x':
            print("Bye")
            break
        else:
            print(f"Don't know what to do with '{val}'")
        print()
        print()


def query_packages():
    name = input("What package would you like details for? [hint: PackageNNNN]? ")

    t0 = time.time()

    package = PackageService.find_package_by_name(name)
    if not package:
        print(f"No package with name {name} found.")
        return

    r = PackageService.latest_package_release(package)
    t1 = time.time()
    if not r:
        print(f"No release found for package {package.name}")
        return

    print("PACKAGE: " + package.name)
    print(f"  Status: "
          f"[CI: {'passing' if r.health.ci else 'failing'}] "
          f"[Health: {r.health.health_index:.1f}]  "
          f"[Coverage: {r.health.coverage:.1f}]")
    print()
    print(f"Current version: {r.version_number}")
    print()
    print(f"Description: {r.description[:100]} ...")
    print()
    print(f"Maintainers:")
    maintainers = PackageService.maintainers(package)
    for m in maintainers:
        print(f"* {m.name} ({m.email})")
    print()
    print()
    print(f"Topics:")
    for t in r.topics:
        print("* " + t)
    print()
    print(f"Supported languages:")
    for lang in r.programming_languages:
        print("* " + lang)
    print()
    print(f"Dependencies:")
    for d in r.dependencies:
        print("* " + d)
    print()
    print(f"Elapsed time: {(t1-t0)*1000:.3f} ms.")


def view_downloads():
    t0 = time.time()

    tops = PackageService.popular_packages(limit=10)

    dt = time.time() - t0
    print("Top 10 packages by downloads")
    print()
    for idx, p in enumerate(tops):
        print(f"{idx+1}. {p.total_downloads:,} {p.name}")
    print()
    print(f"Elapsed time: {dt*1000:,.03f} ms.")


def print_header():
    print('-------------------------------------')
    print('       PYPI DATA EXPLORER')
    print('-------------------------------------')
    print()
    print("Current stats: ")
    print(f"Packages: {PackageService.package_count():,}")
    print(f"Releases: {PackageService.release_count():,}")
    print(f"Users: {PackageService.user_count():,}")
    print(f"Downloads: {PackageService.download_count():,}")
    print()


if __name__ == '__main__':
    main()
