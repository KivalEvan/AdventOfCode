import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, p2: bool) -> str:
   pairs = [line.split() for line in input.splitlines()]
   l, r = ((list([int(y) for y in x])) for x in zip(*pairs))
   hashmap = {int(pair[0]): 0 for pair in pairs}
   for pair in pairs:
      v = int(pair[1])
      if v not in hashmap:
         hashmap[v] = 0
      hashmap[v] += 1

   total = 0
   if p2:
      for e in l:
         total += e * hashmap[e]
   else:
      l.sort()
      r.sort()
      for i in range(len(l)):
         total += abs(l[i] - r[i])

   return str(total)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, True)


if __name__ == '__main__':
   main()
