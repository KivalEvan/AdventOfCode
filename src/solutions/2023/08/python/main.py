import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': True, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def gcd(a: int, b: int) -> int:
   return a if b == 0 else gcd(b, a % b)


def lcm(a: int, b: int) -> int:
   return (a * b) / gcd(a, b)


def part_one(input: str, is_test: bool) -> str:
   lines = input.split('\n')
   instructions = [0 if x == 'L' else 1 for x in lines[0]]
   maps = {}
   for line in lines[2:]:
      dest, lr = line.split(' = ')
      maps[dest] = [x for x in lr[1:-1].split(', ')]

   i = 0
   nav = 'AAA'
   sz = len(instructions)
   while True:
      m = maps[nav]
      nav = m[instructions[i % sz]]
      i += 1
      if nav == 'ZZZ':
         break

   return str(i)


def part_two(input: str, is_test: bool) -> str:
   lines = input.split('\n')
   instructions = [0 if x == 'L' else 1 for x in lines[0]]
   maps = {}
   navs = []
   for line in lines[2:]:
      dest, lr = line.split(' = ')
      maps[dest] = [x for x in lr[1:-1].split(', ')]
      if dest[2] == 'A':
         navs.append(dest)

   res = 1
   for i in range(len(navs)):
      j = 0
      while True:
         m = maps[navs[i]]
         navs[i] = m[instructions[j % len(instructions)]]
         j += 1
         if navs[i][2] == 'Z':
            break
      res = lcm(res, j)

   return str(int(res))


if __name__ == '__main__':
   main()
