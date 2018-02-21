import time
from services.package_service import PackageService


def main():
    pass
    # Setup db connection: pypi
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

    # TODO: Find package by name
    # TODO: Verify package is found
    # TODO: Get latest release details

    t1 = time.time()

    # TODO: Print details

    print(f"Elapsed time: {(t1-t0)*1000:.3f} ms.")


def view_downloads():
    t0 = time.time()

    # TODO: Get popular (top 10) packages.

    dt = time.time() - t0
    print("Top 10 packages by downloads")
    print()

    # TODO: Show details

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
