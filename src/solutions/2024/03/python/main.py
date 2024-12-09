import sys
import os
import typing
import re

sys.path.append(os.getcwd())
from src.langs.python.run import run


def main() -> None:
   options = {"has_alternate": True, "has_io": False}
   run(sys.argv, part_one, part_two, options)


def mulit(x: str) -> int:
   a, b = re.findall(r"\d{1,3}", x)
   return int(a) * int(b)


def solve(input: str, p2: bool) -> str:
   total = 0
   instructed = True

   for x in re.findall(r"(mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\))", input):
      if x == "do()":
         if p2: instructed = True
         continue
      if x == "don't()":
         if p2: instructed = False
         continue
      if not instructed:
         continue
      total += mulit(x)

   return str(total)


def part_one(input: str, is_test: bool) -> str:
   return solve(input, False)


def part_two(input: str, is_test: bool) -> str:
   return solve(input, True)


if __name__ == "__main__":
   main()
