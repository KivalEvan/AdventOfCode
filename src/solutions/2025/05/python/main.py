import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, is_test: bool, p2: bool) -> str:
   chunks = input.split('\n\n')
   ranges = [[int(x) for x in line.split('-')]
             for line in chunks[0].splitlines()]

   if p2:
      highestMin = 0
      ranges.sort(key=lambda x: x[0])
      return str(
          sum((x[0], highestMin := x[1])[0]
              for x in ((len(range(max(r[0], highestMin), r[1] + 1)),
                         max(highestMin, r[1] + 1)) for r in ranges)))

   return str(
       sum(
           any(r[0] <= x <= r[1] for r in ranges)
           for x in (int(x) for x in chunks[1].splitlines())))


def part_one(input: str, is_test: bool) -> str:
   return solve(input, is_test, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, is_test, True)


if __name__ == '__main__':
   main()
