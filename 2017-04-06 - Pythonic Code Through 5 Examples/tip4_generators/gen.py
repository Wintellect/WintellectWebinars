import csv
import os

from purchases import Purchase


def fibonacci_blocking(limit):
    nums = []
    current, nxt = 0, 1
    for _ in range(1, limit):
        current, nxt = nxt, current + nxt
        nums.append(current)

    return nums


def fibonacci():
    current, nxt = 0, 1
    while True:
        current, nxt = nxt, current + nxt
        yield current


def main():
    # fibonacci
    for n in fibonacci():
        print(n, end=', ')
        if n > 100:
            break
    print()

    # list style
    # generator style
    data = get_data()

    two_bed_100k_homes = (
        (home.price, home.beds)
        for home in data
        if home.beds >= 2 and home.price > 100_000
    )
    print(two_bed_100k_homes)
    count = 0
    for p, b in two_bed_100k_homes:
        count += 1
        print(p, b)
        if count > 5:
            break

    # Find 2 bedroom houses over 100k
    # loop
    # comp

    pass


def get_data():
    base_folder = os.path.dirname(__file__)
    filename = os.path.join(base_folder, 'data',
                            'SacramentoRealEstateTransactions2008.csv')

    with open(filename, 'r', encoding='utf-8') as fin:
        # with open(filename, 'r') as fin:
        reader = csv.DictReader(fin)
        purchases = []
        for row in reader:
            p = Purchase.create_from_dict(row)
            purchases.append(p)

        return purchases


if __name__ == '__main__':
    main()
