#! /usr/bin python3
from creature import Creature
from room import Room


def main():
    print_header()
    room = build_rooms()
    play(room)


def print_header():
    print("*" * 80)
    print("   Welcome to the dungeon")
    print("   Where dragons come to play")
    with open('logo.txt') as fin:
        text = fin.read()
        print(text)


def build_rooms():
    dragon = Creature(12, 'Green dragon')
    cave = Room(name='A dark cave', creature=dragon)
    starting = Room('The main hall', right=cave)

    return starting


def play(room):
    you = Creature(12, 'wizard')
    last_room = room
    while True:
        if last_room != room:
            last_room = room
            print("You enter a room: " + room.name)
        action = input("What do you want to do? [L]ook? [F]ight, Move: L, R, F: ").strip().lower()
        if action == 'l':
            if room.creature:
                print("There is a {} here!".format(room.creature.name))
            elif room.left:
                print("There is a {} to left".format(room.left.name))
            elif room.right:
                print("There is a {} to right".format(room.right.name))
            elif room.forward:
                print("There is a {} ahead".format(room.forward.name))
            else:
                print("Here is nothing to see")
        if action == 'f':
            if room.creature:
                print("You fight the {}!".format(room.creature.name))
                if you.fight(room.creature):
                    print("You have defeated {}".format(room.creature.name))
                    with open('winning.txt') as fin:
                        print(fin.read())
                    break
                else:
                    print("You have died.")
                    with open('losing.txt') as fin:
                        print(fin.read())
                    break
            else:
                print("Here is nothing to see")
        if action == 'l' and room.left:
            room = room.left
        if action == 'r' and room.right:
            room = room.right
        if action == 'f' and room.forward:
            room = room.forward


if __name__ == '__main__':
    main()
