import os.path
from typing import Dict

def get_input(path: str) -> str:
   with open(path, 'r', encoding="utf8") as f:
      lines = f.read()
   return lines.strip()

def get_answers(path: str) -> Dict[str, str]:
   with open(path, 'r', encoding="utf8") as f:
      lines = [x.replace('\n', '') for x in f.readlines()]
   return { 'test1': lines[0], 'part1':  lines[1], 'test2': lines[2], 'part2': lines[3]}