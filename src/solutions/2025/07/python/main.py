import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, is_test: bool, p2: bool) -> str:
   total = 0
   length = input.index('\n')
   buffer = [0] * length
   buffer[input.index('S')] = 1
   for i, c in enumerate(input):
      x = i % (length + 1)
      if c != '^':
         continue
      if buffer[x] > 0:
         total += 1
      buffer[x - 1] += buffer[x]
      buffer[x + 1] += buffer[x]
      buffer[x] = 0

   return str(sum(buffer) if p2 else total)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, is_test, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, is_test, True)


if __name__ == '__main__':
   main()
