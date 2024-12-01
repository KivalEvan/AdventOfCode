import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def part_one(input: str, is_test: bool) -> str:
   pairs = [line.split() for line in input.split('\n')]
   l = [int(pair[0]) for pair in pairs]
   r = [int(pair[1]) for pair in pairs]
   l.sort()
   r.sort()

   total = 0
   for i in range(len(l)):
      total += abs(l[i] - r[i])

   return str(total)


def part_two(input: str, is_test: bool) -> str:
   pairs = [line.split() for line in input.split('\n')]
   l = [int(pair[0]) for pair in pairs]
   hashmap = {int(pair[0]): 0 for pair in pairs}
   for pair in pairs:
      v = int(pair[1])
      if v not in hashmap:
         hashmap[v] = 0
      hashmap[v] += 1

   total = 0
   for e in l:
      total += e * hashmap[e]

   return str(total)


if __name__ == '__main__':
   main()
