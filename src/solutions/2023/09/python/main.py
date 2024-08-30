import sys
import os
from typing import List

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def difference(history: List[int], length: int) -> List[int]:
   for i in range(length):
      history[i] = history[i + 1] - history[i]
   return history


def extrapolate(history: List[int], length: int) -> int:
   length = length - 1
   last = history[length]
   if length == 0:
      return last
   return extrapolate(difference(history, length), length) + last


def part_one(input: str, is_test: bool) -> str:
   parsed = [[int(y) for y in x.split(' ')] for x in input.split('\n')]
   res = 0
   for history in parsed:
      res += extrapolate(history, len(history))
   return str(res)


def part_two(input: str, is_test: bool) -> str:
   parsed = [[int(y) for y in x.split(' ')] for x in input.split('\n')]
   res = 0
   for history in parsed:
      history.reverse()
      res += extrapolate(history, len(history))
   return str(res)


if __name__ == '__main__':
   main()
