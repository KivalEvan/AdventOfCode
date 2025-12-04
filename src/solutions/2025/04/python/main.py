import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def count_neighbour(x: int, y: int, m: int, input: str) -> int:
   adjacent = 0
   for nX in range(-1, 2):
      for nY in range(-1, 2):
         index = m * (y + nY) + x + nX + y + nY
         if index < 0 or index >= len(input): continue
         if input[index] == '@': adjacent += 1
   return adjacent - 1

def update_neighbour(x: int, y: int, m: int, grid: bytearray, candidates: typing.List) -> None:
   for nX in range(-1, 2):
      for nY in range(-1, 2):
         index = m * (y + nY) + x + nX + y + nY
         if index < 0 or index >= len(grid): continue
         if grid[index]:
            grid[index] -= 1
         if grid[index] == 3:
            candidates.append((x + nX, y + nY))


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, is_test: bool, p2: bool) -> str:
   grid = bytearray(len(input))
   m = input.index('\n')
   
   candidates = []
   for index in range(m * m + m - 1):
      if input[index] == '@':
         x = index % (m + 1)
         y = index // (m + 1)
         grid[index] = count_neighbour(x, y, m, input)
         if grid[index] < 4:
            candidates.append((x, y))
            
   if not p2: return str(len(candidates))

   total = 0
   while candidates:
      total += 1
      x, y = candidates.pop()
      grid[m * y + x + y] = 0
      update_neighbour(x, y, m, grid, candidates)

   return str(total)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, is_test, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, is_test, True)


if __name__ == '__main__':
   main()
