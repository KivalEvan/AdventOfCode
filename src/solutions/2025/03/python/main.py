import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, is_test: bool, p2: bool) -> str:
   res = 0
   for line in input.split('\n'):
      start = 0
      max = 12 if p2 else 2
      b = line.encode('utf-8')
      for digit in range(max):
         marked = 0
         n = 0
         t = max - 1 - digit
         l = len(line) - t
         for it in range(start, l):
            parsed = b[it] - int.from_bytes(b'0')
            if n < parsed:
               marked = it
               n = parsed
         start = marked + 1
         res += n * (10**t)

   return str(res)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, is_test, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, is_test, True)


if __name__ == '__main__':
   main()
