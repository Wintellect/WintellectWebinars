# Create
import random

t = "Name", 7, "Height", "Weight", [1, 2, 7]
print(type(t), t)

# unpack
n, num, _, _, l = t
print(n, num, l)

# For swapping
for idx, val in enumerate(l):
    print("{}. Value is {}".format(idx + 1, val))


# For method args


def get_measurement():
    x = random.randint(1, 100)
    y = random.randint(1, 100)
    val = random.randint(1, 100)

    return x, y, val


u, v, value = get_measurement()
print("Measurement is {},{} = {}".format(u, v, value))
