import sys
import os
import re
from math import ceil, floor, sqrt
from typing import List

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def ohnomath(b: int, c: int) -> int:
   pepsilon = 0.001
   mn = floor((b + sqrt(abs(b * b - 4 * c))) / 2 - pepsilon)
   mx = ceil((b - sqrt(abs(b * b - 4 * c))) / 2 + pepsilon)
   return mn - mx + 1


def part_one(input: str, is_test: bool) -> str:
   td = [[int(y) for y in x.split(':')[1].strip().split(' ') if y != '']
         for x in input.split('\n')]
   res = 1
   for i in range(len(td[0])):
      res *= ohnomath(td[0][i], td[1][i])
   return str(res)


def part_two(input: str, is_test: bool) -> str:
   td = [
       ''.join(x.split(':')[1].strip().split(' ')) for x in input.split('\n')
   ]
   return str(ohnomath(int(td[0]), int(td[1])))


if __name__ == '__main__':
   main()
