import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, is_test: bool, p2: bool) -> str:
   splitters = [
       res for res in [[i for i, c in enumerate(line) if c == '^']
                       for line in input.splitlines()] if len(res)
   ]

   visited: typing.Dict[typing.Tuple[int, int], int] = {}

   def depth(x: int, y: int) -> int:
      if y >= len(splitters):
         return 1
      if (x, y) in visited:
         return visited[(x, y)]

      res = 0
      if x in splitters[y]:
         res = depth(x - 1, y + 1) + depth(x + 1, y + 1)
         visited[(x, y)] = res
      else:
         res = depth(x, y + 1)
      return res

   timelines = depth(input.index('S'), 0)

   if p2:
      return str(timelines)
   else:
      return str(len(visited.keys()))


def part_one(input: str, is_test: bool) -> str:
   return solve(input, is_test, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, is_test, True)


if __name__ == '__main__':
   main()
