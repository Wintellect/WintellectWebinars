import random


def main():
    print("Welcome to Hi-Low")

    the_number = random.randint(1, 100)

    guess = get_guess()

    while guess != the_number:
        if guess > the_number:
            print("Sorry, too high")
        elif guess < the_number:
            print("Sorry too low")
        guess = get_guess()

    print("Nice work, you got it!")
    print("done")


def get_guess():
    guess_text = input('Enter a number between 1 and 100: ')
    guess = int(guess_text)
    return guess

print("Module name is {}".format(__name__))

if __name__ == '__main__':
    main()
