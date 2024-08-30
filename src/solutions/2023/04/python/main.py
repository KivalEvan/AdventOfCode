import sys
import os
import re
from typing import List

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def do_part_one(line: str) -> int:
   wins, nums = [[int(z) for z in y.split(' ') if z != '']
                 for y in ''.join([x for x in line[line.index(':') +
                                                   1:]]).split('|')]
   i = -1
   for num in wins:
      if num in nums:
         i += 1
   return 2**i if i != -1 else 0


def part_one(input: str, is_test: bool) -> str:
   return str(sum([do_part_one(x) for x in input.split('\n')]))


def do_part_two(line: str, idx: int, instances: List[int]) -> None:
   wins, nums = [[int(z) for z in y.split(' ') if z != '']
                 for y in ''.join([x for x in line[line.index(':') +
                                                   1:]]).split('|')]
   i = 0
   for num in wins:
      if num in nums:
         i += 1
   while i > 0:
      instances[idx + i] += instances[idx]
      i -= 1
   return


def part_two(input: str, is_test: bool) -> str:
   lines = input.split('\n')
   l = len(lines)
   instances = [1 for _ in range(l)]
   [do_part_two(x, idx, instances) for idx, x in enumerate(lines)]
   return str(sum(instances))


if __name__ == '__main__':
   main()
