import sys
import os
import typing

sys.path.append(os.getcwd())
from src.langs.python.run import run

def main() -> None:
   options = {
      'has_alternate': True,
      'has_io': False
   }
   run(sys.argv, part_one, part_two, options)

def get_num(str: str) -> str:
   if str.startswith("zero"):
      return '0'
   if str.startswith("one"):
      return '1'
   if str.startswith("two"):
      return '2'
   if str.startswith("three"):
      return '3'
   if str.startswith("four"):
      return '4'
   if str.startswith("five"):
      return '5'
   if str.startswith("six"):
      return '6'
   if str.startswith("seven"):
      return '7'
   if str.startswith("eight"):
      return '8'
   if str.startswith("nine"):
      return '9'
   return None;

def get_num2(str: str) -> str:
   if str[0].isdigit():
      return str[0]
   return get_num(str)

def do_part_one(line: str) -> int:
   digits = [x for x in line if x.isdigit()]
   return int(digits[0] + digits[-1])

def part_one(input: str, is_test: bool) -> str:
   return str(sum(do_part_one(x) for x in input.split('\n')))

def do_part_two(line: str) -> int:
   res = ''
   l = range(len(line))
   for j in l:
      c = get_num2(line[j:])
      if c != None:
         res += c
         break
   for j in reversed(l):
      c = get_num2(line[j:])
      if c != None:
         res += c
         break
   return int(res)

def part_two(input: str, is_test: bool) -> str:
   return str(sum(do_part_two(x) for x in input.split('\n')))

if __name__ == '__main__':
   main()
