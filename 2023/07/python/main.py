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

def part_one(input: str, is_test: bool) -> str:
   return ''

def part_two(input: str, is_test: bool) -> str:
   return ''

if __name__ == '__main__':
   main()
