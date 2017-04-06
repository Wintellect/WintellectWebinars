class House:
    def __init__(self, beds, price, date=None):
        self.date = date
        self.price = price
        self.beds = beds


house = House(3, 102000)
print(house.price)

house.other = "New!"

print(house.other)
print(house.__dict__)

house2 = House(5, 104000)
print(house2.__dict__)

print(id(house2.__dict__), id(house.__dict__))
