import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def killme(ary: list[int]) -> bool:
   incre = False
   decre = False
   for i in range(1, len(ary)):
      val = ary[i] - ary[i - 1]
      if val > 0:
         incre = True
      if val < 0:
         decre = True
      if incre and decre:
         return False
      change = abs(val)
      if change < 1 or change > 3:
         return False
   return True


def killme2(ary: list[int]) -> bool:
   if killme(ary):
      return True
   for i in range(len(ary)):
      if killme(ary[:i] + ary[i + 1:]):
         return True
   return False


def part_one(input: str, is_test: bool) -> str:
   return str(
       sum([
           1 for x in input.splitlines() if killme([int(y) for y in x.split()])
       ]))


def part_two(input: str, is_test: bool) -> str:
   return str(
       sum([
           1 for x in input.splitlines()
           if killme2([int(y) for y in x.split()])
       ]))


if __name__ == '__main__':
   main()
