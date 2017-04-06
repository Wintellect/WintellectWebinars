import csv
import os

from purchases import Purchase


def main():
    # fibonacci

    # list style
    # generator style

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
