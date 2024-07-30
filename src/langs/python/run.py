from src.langs.python.input import get_answers, get_input
from typing import Callable, Dict, List
import os.path
import time

def test(result: str, expected: str):
   if expected == '':
      return
   if result != expected:
      print(f'Expected {expected}, got {result}')
      raise Exception('Test failed')

def perform(tag: str, func: Callable[[str, bool], str], path: str, has_io: bool):
   print(f'\n\\ {tag}')
   is_test = tag.startswith('Test')
   start = 0
   end = 0
   elapsed_io = 0
   elapsed_part = 0
   
   start = time.perf_counter_ns()
   input = path if has_io else get_input(path)
   end = time.perf_counter_ns()
   elapsed_io = (end - start) / 1_000_000
   
   start = time.perf_counter_ns()
   result = func(input, is_test)
   end = time.perf_counter_ns()
   elapsed_part = (end - start) / 1_000_000
   
   print(f' -- Time taken (ms):')
   print(f' | IO > PART > ALL')
   print(f' | {round(elapsed_io, 3)} > {round(elapsed_part, 3)} > {round((elapsed_io + elapsed_part), 3)}')
   print(f'/ Result: {result}')
   
   return result
   
def bench(tag: str, func: Callable[[str, bool], str], path: str, it: int, has_io: bool):
   print(f'\nBenchmarking {tag} (ms) min..max avg')
   is_test = tag.startswith('Test')
   start = 0
   end = 0
   
   elapsed_io = []
   elapsed_part = []
   elapsed_overall = []
   
   for i in range(it):
      start = time.perf_counter_ns()
      input = path if has_io else get_input(path)
      end = time.perf_counter_ns()
      elapsed_io.append((end - start) / 1_000_000)
      
      start = time.perf_counter_ns()
      func(input, is_test)
      end = time.perf_counter_ns()
      elapsed_part.append((end - start) / 1_000_000)
      
      elapsed_overall.append(elapsed_io[i] + elapsed_part[i])
   
   calc_min = min(elapsed_io)
   calc_max = max(elapsed_io)
   calc_avg = sum(elapsed_io) / len(elapsed_io)
   print(f'IO: {round(calc_min, 3)} .. {round(calc_max, 3)} - {round(calc_avg, 3)}')
   
   calc_min = min(elapsed_part)
   calc_max = max(elapsed_part)
   calc_avg = sum(elapsed_part) / len(elapsed_part)
   print(f'Part: {round(calc_min, 3)} .. {round(calc_max, 3)} - {round(calc_avg, 3)}')
   
   calc_min = min(elapsed_overall)
   calc_max = max(elapsed_overall)
   calc_avg = sum(elapsed_overall) / len(elapsed_overall)
   print(f'Overall: {round(calc_min, 3)} .. {round(calc_max, 3)} - {round(calc_avg, 3)}')

def run(args: List[str], part1: Callable[[str, bool], str], part2: Callable[[str, bool], str], options: Dict):
   path = args[1]
   
   path_answers = os.path.join(path, 'answers.txt')
   path_input_test1 = os.path.join(path, 'test1.txt')
   path_input_test2 = os.path.join(path, ('test2.txt' if options.get('has_alternate') else 'test1.txt'))
   path_input_main = os.path.join(path, 'input.txt')
   
   itBench = int(args[2]) if len(args) > 2 else 0
   if itBench > 0:
      bench('Test 1', part1, path_input_test1, itBench, options.get('has_io'))
      bench('Part 1', part1, path_input_main, itBench, options.get('has_io'))
      bench('Test 2', part2, path_input_test2, itBench, options.get('has_io'))
      bench('Part 2', part2, path_input_main, itBench, options.get('has_io'))
      return
   
   answers = get_answers(path_answers)
   result = perform('Test 1', part1, path_input_test1, options.get('has_io'))
   test(result, answers.get('test1'))
   result = perform('Part 1', part1, path_input_main, options.get('has_io'))
   test(result, answers.get('part1'))
   result = perform('Test 2', part2, path_input_test2, options.get('has_io'))
   test(result, answers.get('test2'))
   result = perform('Part 2', part2, path_input_main, options.get('has_io'))
   test(result, answers.get('part2'))
   
   return