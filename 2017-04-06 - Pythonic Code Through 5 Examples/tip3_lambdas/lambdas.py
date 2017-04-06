# as predicate

def find_numbers(nums, test):
    lst = list()
    for i in nums:
        if test(i):
            lst.append(i)

    return lst


#
# def is_even(n):
#     return n % 2 == 0


result = find_numbers([1, 2, 3, 8, 3, 2, 87, 54, 55, 88, -2, -10],
                      lambda n: n % 2 == 0)
print(result)

# sorting example
result.sort()
print(result)

result.sort(key=lambda v: abs(v))
print(result)
