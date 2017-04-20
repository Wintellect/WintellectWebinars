import random


class Creature:
    def __init__(self, power: int, name: str):
        self.name = name
        self.power = power

    def fight(self, other) -> bool:
        me = random.random() * self.power
        them = random.random() * other.power

        if me >= them:
            return True
        else:
            return False
