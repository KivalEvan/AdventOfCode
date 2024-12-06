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


def part_one(input: str, is_test: bool) -> str:
   return str(
       sum([mulit(x) for x in re.findall(r"mul\(\d{1,3},\d{1,3}\)", input)]))


def part_two(input: str, is_test: bool) -> str:
   total = 0
   instructed = True

   for x in re.findall(r"(mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\))", input):
      if x == "do()":
         instructed = True
         continue
      if x == "don't()":
         instructed = False
         continue
      if not instructed:
         continue
      total += mulit(x)

   return str(total)


if __name__ == "__main__":
   main()
