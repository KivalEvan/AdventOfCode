import sys
import os
import re
from typing import List

sys.path.append(os.getcwd())
from src.langs.python.run import run

def main() -> None:
   options = {
      'has_alternate': False,
      'has_io': False
   }
   run(sys.argv, part_one, part_two, options)

def is_symbol(c: str):
   return \
      c == '*' or \
      c == '$' or \
      c == '=' or \
      c == '#' or \
      c == '%' or \
      c == '/' or \
      c == '&' or \
      c == '+' or \
      c == '-' or \
      c == '@'

def yeet_the_number(grid: List[List[str]], x: int, y: int) -> str:
   res = ''
   if (grid[y][x].isnumeric()):
      res += grid[y][x]
      grid[y][x] = '.'

      if (x > 0):
         res = yeet_the_number(grid, x - 1, y) + res
      if (x < len(grid[y]) - 1):
         res += yeet_the_number(grid, x + 1, y)
   return res

def int_try_parse(value: str) -> int:
   try:
      return int(value)
   except ValueError:
      return 0

def part_one(input: str, is_test: bool) -> str:
   grid = [list(x) for x in input.split('\n')]
   sz = len(grid[0])
   
   res = 0
   
   for y in range(sz):
      for x in range(sz):
         if is_symbol(grid[y][x]):
            if (x > 0):
               if (y < sz - 1):
                  res += int_try_parse(yeet_the_number(grid, x - 1, y + 1))
               if (y > 0):
                  res += int_try_parse(yeet_the_number(grid, x - 1, y - 1))
               res += int_try_parse(yeet_the_number(grid, x - 1, y))
            if (x < sz - 1):
               if (y < sz - 1):
                  res += int_try_parse(yeet_the_number(grid, x + 1, y + 1))
               if (y > 0):
                  res += int_try_parse(yeet_the_number(grid, x + 1, y - 1))
               res += int_try_parse(yeet_the_number(grid, x + 1, y))
            if (y > 0):
               res += int_try_parse(yeet_the_number(grid, x, y - 1))
            if (y < sz - 1):
               res += int_try_parse(yeet_the_number(grid, x, y + 1))
   return str(res)

def part_two(input: str, is_test: bool) -> str:
   grid = [list(x) for x in input.split('\n')]
   sz = len(grid[0])
   
   res = 0
   
   for y in range(sz):
      for x in range(sz):
         if grid[y][x] == '*':
            ary = []
            if (x > 0):
               if (y < sz - 1):
                  ary.append(int_try_parse(yeet_the_number(grid, x - 1, y + 1)))
               if (y > 0):
                  ary.append(int_try_parse(yeet_the_number(grid, x - 1, y - 1)))
               ary.append(int_try_parse(yeet_the_number(grid, x - 1, y)))
            if (x < sz - 1):
               if (y < sz - 1):
                  ary.append(int_try_parse(yeet_the_number(grid, x + 1, y + 1)))
               if (y > 0):
                  ary.append(int_try_parse(yeet_the_number(grid, x + 1, y - 1)))
               ary.append(int_try_parse(yeet_the_number(grid, x + 1, y)))
            if (y > 0):
               ary.append(int_try_parse(yeet_the_number(grid, x, y - 1)))
            if (y < sz - 1):
               ary.append(int_try_parse(yeet_the_number(grid, x, y + 1)))
            ary = [x for x in ary if x > 0]
            if (len(ary) == 2):
               res += ary[0] * ary[1]
               
   return str(res)

if __name__ == '__main__':
   main()
