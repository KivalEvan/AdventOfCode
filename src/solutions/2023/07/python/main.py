import sys
import os
import re
from typing import List
from enum import Enum

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


ranking = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'J': 10,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
    '1': 0,
}

card_type = {
    'HIGH_CARD': 0,
    'ONE_PAIR': 1,
    'TWO_PAIR': 2,
    'THREE_OF_A_KIND': 3,
    'FULL_HOUSE': 4,
    'FOUR_OF_A_KIND': 5,
    'FIVE_OF_A_KIND': 6,
}


def sort_card(a: [str, int]) -> int:
   return [ranking[i] for i in a[0]]


def get_type(str: str) -> int:
   values = [0 for _ in range(14)]
   for k in str:
      values[ranking[k]] += 1
   if (values[0]):
      temp = values[0]
      values[0] = 0
      idx = values.index(max(values))
      values[idx] += temp

   values = [x for x in values if x > 0]
   l = len(values)
   if l == 1: return card_type['FIVE_OF_A_KIND']
   if l == 4: return card_type['ONE_PAIR']
   if l == 5: return card_type['HIGH_CARD']

   mn = 5
   mx = 0
   for v in values:
      if mn > v: mn = v
      if mx < v: mx = v
   if mn == 1:
      if mx == 2: return card_type['TWO_PAIR']
      if mx == 3: return card_type['THREE_OF_A_KIND']
      if mx == 4: return card_type['FOUR_OF_A_KIND']
   return card_type['FULL_HOUSE']


def parse_input(input: str, joker: bool) -> [str, int]:
   temp = input.split(' ')
   if joker:
      temp[0] = temp[0].replace('J', '1')
   return [temp[0], int(temp[1])]


def solve(input: str, joker: bool) -> str:
   groups = [[] for _ in range(7)]
   for y in [parse_input(x, joker) for x in input.splitlines()]:
      groups[get_type(y[0])].append(y)

   res = 0
   i = 1
   for g in groups:
      for s in sorted(g, key=sort_card):
         res += s[1] * i
         i += 1
   return str(res)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, True)


if __name__ == '__main__':
   main()
