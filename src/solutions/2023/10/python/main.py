import sys
import os
import typing
from collections import deque

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': True, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def find_start(grid: typing.List[str]) -> typing.Tuple[int, int]:
   for y in range(len(grid)):
      for x in range(len(grid[y])):
         if (grid[y][x] == 'S'):
            return (x, y)
   assert "Could not find starting point"


def go_up(grid: typing.List[str], x: int, y: int):
   criteria = 'S7F|'
   return y > 0 and grid[y - 1][x] in criteria


def go_down(grid: typing.List[str], x: int, y: int):
   criteria = 'SLJ|'
   return y < len(grid) - 1 and grid[y + 1][x] in criteria


def go_left(grid: typing.List[str], x: int, y: int):
   criteria = 'SLF-'
   return x > 0 and grid[y][x - 1] in criteria


def go_right(grid: typing.List[str], x: int, y: int):
   criteria = 'S7J-'
   return x < len(grid[y]) - 1 and grid[y][x + 1] in criteria


def look_up(grid: typing.List[str], x: int,
            y: int) -> typing.List[typing.Tuple[int, int]]:
   c = grid[y][x]
   res = []
   if c == '|':
      if go_up(grid, x, y):
         res.append((x, y - 1))
      if go_down(grid, x, y):
         res.append((x, y + 1))
   if c == '-':
      if go_left(grid, x, y):
         res.append((x - 1, y))
      if go_right(grid, x, y):
         res.append((x + 1, y))
   if c == 'L':
      if go_up(grid, x, y):
         res.append((x, y - 1))
      if go_right(grid, x, y):
         res.append((x + 1, y))
   if c == 'J':
      if go_up(grid, x, y):
         res.append((x, y - 1))
      if go_left(grid, x, y):
         res.append((x - 1, y))
   if c == '7':
      if go_down(grid, x, y):
         res.append((x, y + 1))
      if go_left(grid, x, y):
         res.append((x - 1, y))
   if c == 'F':
      if go_down(grid, x, y):
         res.append((x, y + 1))
      if go_right(grid, x, y):
         res.append((x + 1, y))
   if c == 'S':
      if go_up(grid, x, y):
         res.append((x, y - 1))
      if go_down(grid, x, y):
         res.append((x, y + 1))
      if go_left(grid, x, y):
         res.append((x - 1, y))
      if go_right(grid, x, y):
         res.append((x + 1, y))

   return res


def part_one(input: str, is_test: bool) -> str:
   grid = [x for x in input.split('\n')]
   visited = [[False for _ in range(len(grid[0]))] for _ in range(len(grid))]

   i = 0
   queue = deque()
   queue.append(find_start(grid))
   while queue:
      current = queue.popleft()
      found = look_up(grid, current[0], current[1])
      for f in found:
         if (visited[f[1]][f[0]]):
            continue
         visited[f[1]][f[0]] = True
         queue.append(f)
         i += 1

   return str(int(i / 2))


def part_two(input: str, is_test: bool) -> str:
   grid = [x for x in input.split('\n')]
   visited = [[False for _ in range(len(grid[0]) * 3)]
              for _ in range(len(grid) * 3)]

   queue = deque()
   queue.append(find_start(grid))
   while queue:
      current = queue.popleft()
      found = look_up(grid, current[0], current[1])
      for f in found:
         visited[f[1] * 3 + 1 + current[1] - f[1]][f[0] * 3 + 1 + current[0] -
                                                   f[0]] = True
         if (visited[f[1] * 3 + 1][f[0] * 3 + 1]):
            continue
         visited[f[1] * 3 + 1][f[0] * 3 + 1] = True
         queue.append(f)

   queue.append((0, 0))
   while queue:
      current = queue.popleft()
      if (visited[current[1]][current[0]]):
         continue
      visited[current[1]][current[0]] = True
      for ud in [-1, 0, 1]:
         for lr in [-1, 0, 1]:
            if (current[1] + ud < 0 or current[1] + ud >= len(visited)):
               continue
            if (current[0] + lr < 0 or current[0] + lr >= len(visited[0])):
               continue
            if (visited[current[1] + ud][current[0] + lr]):
               continue
            queue.append((current[0] + lr, current[1] + ud))

   res = 0
   for y in range(len(grid)):
      for x in range(len(grid[0])):
         if (not visited[1 + y * 3][1 + x * 3]):
            res += 1

   return str(res)


if __name__ == '__main__':
   main()
