import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {'has_alternate': False, 'has_io': False}
   run(sys.argv, part_one, part_two, options)


def solve(input: str, is_test: bool, p2: bool) -> str:
   return ''


def part_one(input: str, is_test: bool) -> str:
   return solve(input, is_test, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, is_test, True)


if __name__ == '__main__':
   main()
