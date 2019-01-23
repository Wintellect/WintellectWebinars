from typing import List


def fib(limit: int) -> List[int]:
    numbers = []
    current, nxt = 0, 1
    while len(numbers) < limit:
        current, nxt = nxt, current + nxt
        numbers.append(current)

    return numbers


result = fib(200)

for n in result:
    print(n, end=', ')
    if n > 10000:
        break

print()
print("Done")
