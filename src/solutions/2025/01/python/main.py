import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, p2: bool) -> str:
   dial = 50
   zero = 0
   for n in input.split('\n'):
      newDial = dial + int(n[1:]) * (1 if n[0] == 'R' else -1)

      if p2:
         zero += abs(newDial) // 100 + (dial and newDial <= 0)
         dial = newDial % 100
      else:
         zero += not (dial := newDial % 100)

   return str(zero)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, True)


if __name__ == '__main__':
   main()
