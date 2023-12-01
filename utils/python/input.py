import os.path

def get_input(input: str) -> str:
   with open(path, 'r', encoding="utf8") as f:
      lines = f.readlines()
   return lines

def get_answers(input: str) -> (str, str, str, str):
   with open(os.path.join(os.path.dirname(path), '..', 'answers.txt'), 'r', encoding="utf8") as f:
      lines = f.readlines()
   return lines