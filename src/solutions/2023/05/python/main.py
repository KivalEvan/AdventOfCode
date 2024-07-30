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

def tuple_moment(str: str) -> List[tuple[int, ...]]:
   tup = [int(x) for x in str.split(' ')]
   return [[tup[1], tup[1] + tup[2] - 1], [tup[0], tup[0] + tup[2] - 1]]

def parse_input(input: str, single: bool) -> [List[tuple[int, ...]], List[List[tuple[int, ...]]]]:
   parsed = input.split('\n\n');
   header = [int(x) for x in parsed[0].split(':')[1].split(' ') if x != '']
   if single:
      seed_ranges = [[x, x] for x in header]
   else:
      seed_ranges = [[header[idx - 1], header[idx - 1] + header[idx]] for idx, x in enumerate(header) if idx % 2 == 1]
   src_to_dest_ranges = [[tuple_moment(y) for y in x.split('\n')[1:]] for x in parsed[1:]]
   return [seed_ranges, src_to_dest_ranges]

def solve(input: str, single: bool) -> str:
   seed_ranges, src_to_dest_ranges = parse_input(input, single)
   
   for groups in src_to_dest_ranges:
      for g in groups:
         for r in seed_ranges:
            if r[0] < g[0][0] and g[0][0] < r[1]:
               seed_ranges.append([r[0], g[0][0] - 1])
               r[0] = g[0][0]
            if r[0] < g[0][1] and g[0][1] < r[1]:
               seed_ranges.append([g[0][1] + 1, r[1]])
               r[1] = g[0][1]
      for r in seed_ranges:
         found = None
         for gr in groups:
            if gr[0][0] <= r[0] and \
               r[0] <= gr[0][1] and \
               r[1] >= gr[0][0] and \
               gr[0][1] >= r[1]:
               found = gr
               break
         if found:
            diff = found[1][0] - found[0][0]
            r[0] += diff
            r[1] += diff
   return str(min([x[0] for x in seed_ranges]))

def part_one(input: str, is_test: bool) -> str:
   return solve(input, True)

def part_two(input: str, is_test: bool) -> str:
   return solve(input, False)

if __name__ == '__main__':
   main()
