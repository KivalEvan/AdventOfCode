import sys
import os
import re
from typing import List

sys.path.append(os.getcwd())
from src.python.run import run

def main() -> None:
   options = {
      'has_alternate': False,
      'has_io': False
   }
   run(sys.argv, part_one, part_two, options)

def get_tuple(xdd: str) -> tuple[int, str]:
   x = xdd.strip().split(' ')
   return [int(x[0]), x[1]]

def get_sequences(game: str) -> List[tuple[int, str]]:
   return [get_tuple(x) for x in game[game.index(':') + 1:].replace(';', ',').split(',')]

def do_part_one(cubes: List[tuple[int, str]], idx: int) -> int:
   rgb = [12, 13, 14]
   for cube in cubes:
      i = ord(cube[1][0]) % 3
      if cube[0] > rgb[i]:
         return 0
   return idx + 1

def part_one(input: str, is_test: bool) -> str:
   return str(sum([do_part_one(x, idx) for idx, x in enumerate([get_sequences(x) for x in input.split('\n')])]))

def do_part_two(cubes: List[tuple[int, str]]) -> int:
   rgb = [0, 0, 0]
   for cube in cubes:
      i = ord(cube[1][0]) % 3
      if cube[0] > rgb[i]:
         rgb[i] = cube[0]
   return rgb[0] * rgb[1] * rgb[2]

def part_two(input: str, is_test: bool) -> str:
   return str(sum([do_part_two(x) for x in [get_sequences(x) for x in input.split('\n')]]))

if __name__ == '__main__':
   main()
